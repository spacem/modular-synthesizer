import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { OscillatorService } from './oscillator.service';

@Component( {
	selector: 'app-oscillator',
	templateUrl: './oscillator.component.html',
	styleUrls: [ './oscillator.component.scss' ]
} )
export class OscillatorComponent implements OnInit
{
	@ViewChild('waveform') waveformSelect:ElementRef;
	@ViewChild('tone') toneRange:ElementRef;

	constructor( private mainPanelService:MainPanelService,  private webMIDIService:WebMIDIService, private oscillatorService:OscillatorService ){}

	ngOnInit()
	{
		this.webMIDIService.keySource$.subscribe( key => this.setTone(key.on ? key.frequency : 0) );
		this.webMIDIService.programSource$.subscribe( bank => this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][bank%4] as OscillatorType ) );
	}

	public setTone( tone:number ):void
	{
		this.oscillatorService.setTone(tone);

		//TODO parse value
		this.toneRange.nativeElement.value =  this.oscillatorService.getTone();
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.oscillatorService.setWaveformType(waveformType);
		this.waveformSelect.nativeElement.value = this.oscillatorService.getWaveformType();
	}

	public start():void
	{
		this.oscillatorService.setWaveformType(this.waveformSelect.nativeElement.value);

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.oscillatorService.connect(this.mainPanelService.getMainGain());
		this.oscillatorService.start();
		this.setTone(0);
	}

	public stop():void
	{
		this.oscillatorService.stop();
	}
}
