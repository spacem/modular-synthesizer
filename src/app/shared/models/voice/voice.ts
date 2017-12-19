export class Voice
{
	protected oscs:OscillatorNode[] = [];
	private outNode:AudioNode;

	/**
	 * Build a voice instance.
	 *
	 * @param {number} oscillatorNumber
	 * 	The number of allocatable oscillator.
	 */
	constructor( private oscillatorNumber:number=2 ){}

	public setTone( tone:number ):void
	{
		const currentTime = this.outNode.context.currentTime;
		//TODO Clamp the value, based on output frequency/2 => 48000Hz = -24000/24000
		this.oscs.forEach( (osc,index) => osc.frequency.setValueAtTime( tone*(index+1)*.01, currentTime ) );
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.oscs.forEach( osc => osc.type = waveformType );
	}

	public connect( outNode:AudioNode )
	{
		this.oscs = Array.from({length:this.oscillatorNumber}, ()=>this.createOscillatorNode(outNode));
		this.outNode = outNode;
	}

	public disconnect():void
	{
		this.oscs.forEach( osc => osc.disconnect( this.outNode ) );
		this.oscs = [];
	}

	private createOscillatorNode( outNode:AudioNode ):OscillatorNode
	{
		if( outNode )
		{
			const oscillatorNode:OscillatorNode = outNode.context.createOscillator();
			oscillatorNode.connect( outNode );
			oscillatorNode.frequency.setValueAtTime( 0, outNode.context.currentTime );
			oscillatorNode.start( 0 );

			return oscillatorNode;
		}
		else
			throw Error(`Trying to create an OscillatorNode without any output AudioNode.`);
	}
}