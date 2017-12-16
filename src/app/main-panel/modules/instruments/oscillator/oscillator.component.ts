import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { OscillatorService } from './oscillator.service';
import { Subscription } from 'rxjs/Subscription';
import { MidiNoteMessage } from '../../../../shared/models/midi/midi-note-message';
import { ToneHelper } from '../../../../shared/helpers/tone-helper';

@Component( {
	selector: 'app-oscillator',
	templateUrl: './oscillator.component.html',
	styleUrls: [ './oscillator.component.scss' ]
} )
export class OscillatorComponent implements OnInit, OnDestroy
{
	@ViewChild('waveform') waveformSelect:ElementRef;
	@ViewChild('tone') toneRange:ElementRef;

	private noteSourceSubscription:Subscription;
	private programSubscription:Subscription;

	constructor( private mainPanelService:MainPanelService,  private webMIDIService:WebMIDIService, private oscillatorService:OscillatorService ){}

	ngOnInit()
	{
		this.noteSourceSubscription = this.webMIDIService.noteSource$.subscribe( note => this.setNote(note) );
		this.programSubscription = this.webMIDIService.programSource$.subscribe( program => this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][program.program%4] as OscillatorType ) );
	}

	ngOnDestroy()
	{
		this.noteSourceSubscription.unsubscribe();
		this.programSubscription.unsubscribe();
	}

	public setNote( midiNoteMessage:MidiNoteMessage ):void
	{
		const tone = ToneHelper.noteToFrequency(midiNoteMessage.note);
		this.oscillatorService.setTone(tone);
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
