import { tryCatch } from 'rxjs/util/tryCatch';

export class Voice
{
	protected oscillators:OscillatorNode[] = [];
	private outNode:AudioNode;
	private filter:BiquadFilterNode;

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
		oscillatorNode.frequency.setValueAtTime( 0, context.currentTime );
		oscillatorNode.onended = error => console.error(error);
		oscillatorNode.start( 0 );

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
		console.log(value);
		const context:AudioContext = this.outNode.context;
		this.filter.Q.setTargetAtTime( value, context.currentTime, 15);
		this.filter.frequency.setTargetAtTime(value*100, context.currentTime, 15 );
	}

	public setTone( tone:number ):void
	{
		const currentTime:number = this.outNode.context.currentTime;

		//TODO Clamp the value, based on output frequency/2 => 48000Hz = -24000/24000
		this.oscillators.forEach( (osc, index) =>
		{
			try{
				// To avoid => RangeError: Failed to execute 'exponentialRampToValueAtTime' on 'AudioParam': The float target value provided (0) should not be in the range (-1.40130e-45, 1.40130e-45)
				if( Math.abs(tone) > 1.40130e-45 )
					osc.frequency.exponentialRampToValueAtTime(index ? tone + .25 * index : tone, currentTime + .1 * (index + 1));
				else
					osc.frequency.setTargetAtTime(index ? tone + .25 * index : tone, currentTime + .1 * (index + 1), 15);
			}catch(e)
			{
				console.error(`Trying to set tone "${tone}" led to an error`, e);
			}

		});
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