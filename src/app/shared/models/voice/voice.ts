export class Voice
{
	protected oscillatorNode:OscillatorNode;
	private outNode:AudioNode;

	/**
	 * Build a voice instance.
	 *
	 * @param {number} oscillatorNumber
	 * 	The number of allocatable oscillator.
	 */
	constructor( private oscillatorNumber:number=2 )
	{

	}

	public setTone( tone:number ):void
	{
		if( this.oscillatorNode )
		{
			this.oscillatorNode.frequency.setValueAtTime( tone, this.oscillatorNode.context.currentTime );
		}
		else
			throw Error( `Trying to set oscillator tone on an oscillator that's not connected.` );
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		if( this.oscillatorNode )
			this.oscillatorNode.type = waveformType;
	}

	public connect( node:AudioNode )
	{
		if( !this.oscillatorNode )
			this.createOscillatorNode( node );
		else
			throw Error( `Trying to connect a new node on an already connected oscillator.` );

		this.outNode = node;
	}

	public disconnect():void
	{
		this.oscillatorNode.disconnect( this.outNode );
		this.oscillatorNode = null;
	}

	private createOscillatorNode( outNode:AudioNode )
	{
		if( outNode )
		{
			this.oscillatorNode = outNode.context.createOscillator();
			this.oscillatorNode.connect( outNode );
			this.oscillatorNode.frequency.setValueAtTime( 0, this.oscillatorNode.context.currentTime );
			this.oscillatorNode.start( 0 );

		}
		else
			throw Error(`Trying to create an OscillatorNode without any output AudioNode.`);
	}
}