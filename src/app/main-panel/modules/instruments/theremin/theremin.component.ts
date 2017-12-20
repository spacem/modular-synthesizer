import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Subscription } from 'rxjs/Subscription';
import { Voice } from '../../../../shared/models/voice/voice';

@Component( {
	selector: 'app-theremin',
	templateUrl: './theremin.component.html',
	styleUrls: [ './theremin.component.scss' ]
} )
export class ThereminComponent implements OnInit, OnDestroy
{
	@ViewChild('waveform') waveformSelect:ElementRef;
	@ViewChild('tone') toneRange:ElementRef;
	@ViewChild('pad') pad:ElementRef;

	//private noteSourceSubscription:Subscription;
	private programSubscription:Subscription;
	private voice:Voice;

	constructor( private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService ){}

	ngOnInit()
	{
		//this.noteSourceSubscription = this.webMIDIService.noteSource$.subscribe(note => this.setNote(note) );
		this.programSubscription = this.webMIDIService.programSource$.subscribe(program => this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][program.program%4] as OscillatorType ) );
	}

	ngOnDestroy()
	{
		//this.noteSourceSubscription.unsubscribe();
		this.programSubscription.unsubscribe();
	}

	// public setNote( midiNoteMessage:MidiNoteMessage ):void
	// {
	// 	const tone = ToneHelper.noteToFrequency(midiNoteMessage.note);
	// 	if(midiNoteMessage.on)
	// 		this.setTone(tone);
	// 	else
	// 		this.setTone(0);
	// }

	public start():void
	{

	}

	public stop():void
	{

	}

	public setTone( tone:number ):void
	{
		this.voice.setTone(Number(tone));
		this.toneRange.nativeElement.value = tone;
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.voice.setWaveformType(waveformType);
		this.waveformSelect.nativeElement.value = waveformType;
	}

	public connect():void
	{
		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = Voice.createVoice(this.mainPanelService.getMainGain(),6);
		this.setWaveformType(this.waveformSelect.nativeElement.value);
	}

	public disconnect():void
	{
		this.voice.disconnect();
	}
	public onMouseMove($event:MouseEvent):void
	{
		if( $event )
		{
			const target:HTMLElement = $event.target as HTMLElement;

			const x:number = Math.max(0, 		Math.min($event.clientX - target.offsetLeft,		 target.offsetWidth) );
			const y:number = Math.max(0, 		Math.min($event.clientY - target.offsetTop,		 target.offsetHeight) );

			this.onMove(x,y,target.offsetWidth,target.offsetHeight);
		}

		$event.preventDefault();
	}

	public onTouchMove($event:TouchEvent):void
	{
		if( $event.touches && $event.touches[0] )
		{
			const touch:Touch = $event.touches[0];
			const target:HTMLElement = $event.target as HTMLElement;

			const x:number = Math.max(0, 		Math.min(touch.clientX - target.offsetLeft,		 target.offsetWidth) );
			const y:number = Math.max(0, 		Math.min(touch.clientY - target.offsetTop,		 target.offsetHeight) );

			this.onMove(x,y,target.offsetWidth,target.offsetHeight);
		}

		$event.preventDefault();
	}

	public onMove( x:number, y:number, width:number, height:number ):void
	{
		const maxFreq:number = 8000;
		const tone:number = maxFreq/(width/x);
		this.setTone(tone);
	}
}