import { Injectable } from '@angular/core';

@Injectable()
export class OscillatorService
{
	protected oscillatorNode:OscillatorNode;
	private outNode:AudioNode;
	private tone:number;
	private waveformType:OscillatorType;

	constructor()
	{
	}

	public getTone():number
	{
		return this.tone;
	}

	public setTone( tone:number ):void
	{
		if( this.oscillatorNode )
		{
			//this.oscillatorNode.frequency.value = +this.toneRange.nativeElement.value;
			this.oscillatorNode.frequency.setValueAtTime( tone, this.oscillatorNode.context.currentTime );
		}
		else
			throw Error( `Trying to set oscillator tone on an oscillator that's not connected.` );

		this.tone = tone;
	}

	public getWaveformType():OscillatorType
	{
		return this.waveformType;
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

	public start():void
	{
		this.oscillatorNode.start( 0 );
		this.setTone( 0 );
	}

	public stop():void
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
