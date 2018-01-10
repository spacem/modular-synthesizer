export class Voice
{
	protected oscillators:OscillatorNode[] = [];
	private outNode:AudioNode;
	private filter:BiquadFilterNode;
	private ramp:boolean = false;

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
			throw Error(`Trying to create an OscillatorNode without attaching it to any output AudioNode.`);

		// Fabrication
		const voice = new Voice();
		voice.oscillators = Array.from({length:oscillatorNumber},() => Voice.createOscillator(outNode) );
		voice.filter = Voice.createFilter(outNode);
		voice.outNode = outNode;

		// Connection
		voice.oscillators.forEach( oscillator => oscillator.connect( voice.filter ) );
		voice.filter.connect( voice.outNode );

		return voice;
	}

	private static createOscillator( outNode:AudioNode ):OscillatorNode
	{
		const context:AudioContext = outNode.context;
		const oscillatorNode:OscillatorNode = context.createOscillator();

		// Cannot call start more than once.
		oscillatorNode.start( context.currentTime );

		// Automatically set to 440hz by default, need to be muted.
		oscillatorNode.frequency.setValueAtTime( 0, context.currentTime );

		return oscillatorNode;
	}

	private static createFilter( outNode:AudioNode ):BiquadFilterNode
	{
		const context:AudioContext = outNode.context;
		const lowPassFilter:BiquadFilterNode = context.createBiquadFilter();
		lowPassFilter.type = 'notch';
		lowPassFilter.frequency.setTargetAtTime(0, context.currentTime, 15 );
		lowPassFilter.Q.setTargetAtTime(0, context.currentTime, 15);

		return lowPassFilter;
	}

	public setDetune( value:number ):void
	{
		console.log(value);

		// @see https://www.chromestatus.com/features/5287995770929152
		this.oscillators.forEach( osc => osc.detune.setTargetAtTime( value, this.outNode.context.currentTime, 15 ) );
	}

	public setFilter( value:number ):void
	{
		const context:AudioContext = this.outNode.context;
		this.filter.Q.setTargetAtTime( value, context.currentTime, 15);
		this.filter.frequency.setTargetAtTime(value*100, context.currentTime, 15 );
	}

	public setTone( tone:number ):void
	{
		const currentTime:number = this.outNode.context.currentTime;
		const sampleRate:number = this.outNode.context.sampleRate;

		this.oscillators.forEach( (osc, index) =>
		{
			try
			{
				const nTone:number = Math.max(0, Math.min(tone * (index+1), sampleRate/2) );
				const nTime:number = currentTime + 1/(nTone+1);

				if( this.ramp )
				{
					// To avoid => RangeError: Failed to execute 'exponentialRampToValueAtTime' on 'AudioParam': The float target value provided (0) should not be in the range (-1.40130e-45, 1.40130e-45)
					if( Math.abs(tone) > 1.40130e-45 )
						osc.frequency.exponentialRampToValueAtTime( nTone, nTime );
					else
						osc.frequency.setValueAtTime( 0, currentTime );
				}
				else
				{
					osc.frequency.setValueAtTime( nTone, currentTime );
				}
			}
			catch(e)
			{
				console.error(`Trying to set tone "${tone}" led to error:`, e);
			}
		});
	}

	public stop():void
	{
		const currentTime:number = this.outNode.context.currentTime;
		this.oscillators.forEach(osc =>	osc.stop(currentTime) );
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.oscillators.forEach(osc => osc.type = waveformType );
	}

	public disconnect():void
	{
		this.oscillators.forEach(osc => osc.disconnect( this.filter ) );
		this.filter.disconnect( this.outNode );
		this.oscillators = [];
	}

}