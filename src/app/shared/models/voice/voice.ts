export class Voice
{
	protected oscs:OscillatorNode[] = [];
	private outNode:AudioNode;

	/**
	 * Factory method for the voice.
	 *
	 * @param {AudioNode} outNode
	 * 	The audionode to connect to.
	 *
	 * @param {number} oscillatorNumber
	 * 	The number of allocatable oscillators for one voice. Should not be confused with polyphony voices number. This
	 * 	one just set the number of oscillators per sound patch, per voice so.
	 *
	 * @returns {Voice}
	 *	The newly created voice.
	 */
	public static createVoice( outNode:AudioNode, oscillatorNumber:number=2 ):Voice
	{
		if( !outNode )
			throw Error(`Trying to create an OscillatorNode without attaching it yo any output AudioNode.`);

		const context:AudioContext = outNode.context;

		const voice = new Voice();
		voice.oscs = Array.from({length:oscillatorNumber},() => Voice.createOscillator(outNode) );
		voice.outNode = outNode;

		return voice;
	}

	private static createOscillator( outNode:AudioNode ):OscillatorNode
	{
		const context:AudioContext = outNode.context;
		const oscillatorNode:OscillatorNode = context.createOscillator();
		oscillatorNode.frequency.setValueAtTime( 0, context.currentTime );
		oscillatorNode.onended = error => console.error(error);
		oscillatorNode.detune.value = 127;
		oscillatorNode.start( 0 );

		oscillatorNode.connect( outNode );

		return oscillatorNode;
	}

	private static createFilter( outNode:AudioNode ):BiquadFilterNode
	{
		const context:AudioContext = outNode.context;
		const lowPassFilter:BiquadFilterNode = context.createBiquadFilter();
		lowPassFilter.type = 'lowpass';
		lowPassFilter.frequency.value = 500;
		lowPassFilter.Q.value = 5;

		return lowPassFilter;
	}

	public setTone( tone:number ):void
	{
		const currentTime = this.outNode.context.currentTime;
		//TODO Clamp the value, based on output frequency/2 => 48000Hz = -24000/24000
		this.oscs.forEach( (osc,index) =>
		{
			// To avoid => RangeError: Failed to execute 'exponentialRampToValueAtTime' on 'AudioParam': The float target value provided (0) should not be in the range (-1.40130e-45, 1.40130e-45)
			if( Math.abs(tone) > 1.40130e-45 )
				osc.frequency.exponentialRampToValueAtTime(index ? tone + .25 * index : tone, currentTime + .1 * (index + 1));
		});
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.oscs.forEach( osc => osc.type = waveformType );
	}

	public disconnect():void
	{
		this.oscs.forEach( osc => osc.disconnect( this.outNode ) );
		this.oscs = [];
	}

}