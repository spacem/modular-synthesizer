import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Subscription } from 'rxjs/Subscription';
import { MidiNoteMessage } from '../../../../shared/models/midi/midi-note-message';
import { ToneHelper } from '../../../../shared/helpers/tone-helper';
import { Voice } from '../../../../shared/models/voice/voice';

@Component( {
	selector: 'app-oscillator',
	templateUrl: './theremin.component.html',
	styleUrls: [ './theremin.component.scss' ]
} )
export class OscillatorComponent implements OnInit, OnDestroy
{
	@ViewChild('waveform') waveformSelect:ElementRef;
	@ViewChild('tone') toneRange:ElementRef;

	private noteSourceSubscription:Subscription;
	private programSubscription:Subscription;
	private voice:Voice;

	constructor( private mainPanelService:MainPanelService,  private webMIDIService:WebMIDIService ){}

	ngOnInit()
	{
		this.noteSourceSubscription = this.webMIDIService.noteSource$.subscribe(note => this.setNote(note) );
		this.programSubscription = this.webMIDIService.programSource$.subscribe(program => this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][program.program%4] as OscillatorType ) );
	}

	ngOnDestroy()
	{
		this.noteSourceSubscription.unsubscribe();
		this.programSubscription.unsubscribe();
	}

	public setNote( midiNoteMessage:MidiNoteMessage ):void
	{
		const tone = ToneHelper.noteToFrequency(midiNoteMessage.note);
		if(midiNoteMessage.on)
			this.setTone(tone);
		else
			this.setTone(0);
	}

	public setTone( tone:number ):void
	{
		this.voice.setTone(tone);
		this.toneRange.nativeElement.value = tone;
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.voice.setWaveformType(waveformType);
		this.waveformSelect.nativeElement.value = waveformType;
	}

	public connect():void
	{
		this.voice = new Voice();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice.connect(this.mainPanelService.getMainGain());
		this.setWaveformType(this.waveformSelect.nativeElement.value);
	}

	public disconnect():void
	{
		this.voice.disconnect();
	}
}