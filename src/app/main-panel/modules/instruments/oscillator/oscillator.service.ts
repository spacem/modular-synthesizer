import { Injectable } from '@angular/core';

@Injectable()
export class OscillatorService
{

	protected audioContext:AudioContext;
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
			this.oscillatorNode.frequency.setValueAtTime( tone, this.audioContext.currentTime );
		}

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
		this.outNode = node;

		if( !this.oscillatorNode )
			this.createOscillatorNode( this.outNode );
		else
			console.error( `Trying to connect a new node on an already connected oscillator.` );
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

	private createOscillatorNode( outNode:AudioNode ):OscillatorNode
	{
		const oscillatorNode:OscillatorNode = this.audioContext.createOscillator();
		oscillatorNode.connect( outNode );

		return oscillatorNode;
	}
}
