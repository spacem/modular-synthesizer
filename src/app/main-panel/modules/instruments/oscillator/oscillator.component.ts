import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';

@Component( {
	selector: 'app-oscillator',
	templateUrl: './oscillator.component.html',
	styleUrls: [ './oscillator.component.scss' ]
} )
export class OscillatorComponent implements OnInit
{
	@ViewChild('waveform') waveformSelect:ElementRef;
	@ViewChild('tone') toneRange:ElementRef;

	protected audioContext:AudioContext;
	protected oscillatorNode:OscillatorNode;

	constructor( private mainPanelService:MainPanelService,  private webMIDIService:WebMIDIService ){}

	ngOnInit()
	{
		this.webMIDIService.keySource$.subscribe( key => this.setTone(key.on ? key.frequency : 0) );
		this.webMIDIService.programSource$.subscribe( bank => this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][bank%4] as OscillatorType ) );
	}

	protected create():OscillatorNode
	{
		return this.audioContext.createOscillator();
	}

	public setTone( tone:number ):void
	{
		//TODO parse value
		this.toneRange.nativeElement.value = tone ;

		if(this.oscillatorNode)
		//	this.oscillatorNode.frequency.value = +this.toneRange.nativeElement.value;
			this.oscillatorNode.frequency.setValueAtTime(+this.toneRange.nativeElement.value, this.audioContext.currentTime);
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.waveformSelect.nativeElement.value = waveformType;

		if(this.oscillatorNode)
			this.oscillatorNode.type = waveformType;
	}

	public start():void
	{
		this.oscillatorNode = this.create();
		this.setWaveformType(this.waveformSelect.nativeElement.value);
		this.oscillatorNode.connect(this.mainPanelService.getMainGain());
		this.oscillatorNode.start(0);
		this.setTone(0);
	}

	public stop():void
	{
		this.oscillatorNode.disconnect(this.mainPanelService.getMainGain());
		this.oscillatorNode = null;
	}

}
