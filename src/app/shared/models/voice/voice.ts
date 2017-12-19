export class Voice
{
	protected oscillatorNode:OscillatorNode;
	private outNode:AudioNode;
	private tone:number;
	private waveformType:OscillatorType;

	public setTone( tone:number ):void
	{
		if( this.oscillatorNode )
		{
			this.oscillatorNode.start( 0 );
			this.oscillatorNode.frequency.setValueAtTime( tone, this.oscillatorNode.context.currentTime );
		}
		else
			throw Error( `Trying to set oscillator tone on an oscillator that's not connected.` );

		this.tone = tone;
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		if( this.oscillatorNode )
			this.oscillatorNode.type = waveformType;

		this.waveformType = waveformType;
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
			const oscillatorNode:OscillatorNode = outNode.context.createOscillator();
			oscillatorNode.connect( outNode );

			this.oscillatorNode = oscillatorNode;
		}
		else
			throw Error(`Trying to create an OscillatorNode without any output AudioNode.`);
	}
}