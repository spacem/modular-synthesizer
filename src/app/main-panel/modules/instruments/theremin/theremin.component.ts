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
	@ViewChild('xRange') xRange:ElementRef;
	@ViewChild('yRange') yRange:ElementRef;
	@ViewChild('pad') pad:ElementRef;
	@ViewChild('voices') voices:ElementRef;

	//private noteSourceSubscription:Subscription;
	private programSubscription:Subscription;
	private voice:Voice;

	public maxFrequency:number = 8000;

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

	public start():void{}

	public stop():void{}

	public setTone( tone:number ):void
	{
		this.voice.setTone(Number(tone));
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.voice.setWaveformType(waveformType);
		this.waveformSelect.nativeElement.value = waveformType;
	}

	public connect():void
	{
		if( this.voice )
			this.voice.disconnect();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = Voice.createVoice(this.mainPanelService.getMainGain(),this.voices.nativeElement.value);
		this.setWaveformType(this.waveformSelect.nativeElement.value);
		this.setTone(this.xRange.nativeElement.value);
	}

	public disconnect():void
	{
		this.voice.disconnect();
	}

	/**
	 * Handles mouse move events on "mouseable" devices.
	 *
	 * @param {MouseEvent} $event
	 * 	Standard touch event emitted by the DOM.
	 */
	public onMouseMove( $event:MouseEvent ):void
	{
		if( $event )
			this.onMove( $event.clientX, $event.clientY );
	}

	/**
	 * Handles touch move events on "toucheable" devices.
	 *
	 * @param {TouchEvent} $event
	 * 	Standard touch event emitted by the DOM.
	 */
	public onTouchMove( $event:TouchEvent ):void
	{
		if( $event )
		{
			if( $event.touches && $event.touches[0] )
			{
				const touch:Touch = $event.touches[0];
				this.onMove( touch.clientX, touch.clientY );
			}

			// Avoid unwanted page scroll when dragging screen of mobile devices.
			$event.preventDefault();
		}
	}

	/**
	 * Set the current pointer position on the pad HTML element
	 *
	 * @param {number} clientX
	 * 	The x position of the pointer in the viewport.
	 *
	 * @param {number} clientY
	 * 	The y position of the pointer in the viewport.
	 */
	private onMove(	clientX:number,	clientY:number ):void
	{
		const boundingClientRect:ClientRect = this.pad.nativeElement.getBoundingClientRect();

		// Values need to be bounded because mouse moves can be sent even outside the pad area.
		const x:number = Math.max(0, 	Math.min(clientX - boundingClientRect.left, 		boundingClientRect.width 	) );
		const y:number = Math.max(0, 	Math.min(clientY - boundingClientRect.top, 		boundingClientRect.height 	) );

		const percentX:number = x === 0 ? 0 : 100 / (boundingClientRect.width/x);
		const percentY:number = y === 0 ? 0 : 100 / (boundingClientRect.height/y);

		this.setX(percentX);
		this.setY(percentY);
	}

	/**
	 * Set the current X position of the pointer on the pad.
	 *
	 * @param {number} percent
	 * 	The current X position of the pointer on the pad (expressed in percent)
	 */
	public setX( percent:number ):void
	{
		//percent = this.percentLinearToLog(percent);

		const tone:number = this.maxFrequency * percent/100;
		this.setTone(tone);

		this.xRange.nativeElement.value = percent;

		//console.log(Array(100).fill(0).map((e,i) => this.percentLinearToLog(i) ));
	}

	/**
	 * Set the current Y position of the pointer on the pad.
	 *
	 * @param {number} percent
	 * 	The current Y position of the pointer on the pad (expressed in percent)
	 */
	public setY( percent:number ):void
	{
		//const maxDetune:number = 256;
		//const detune:number = maxDetune*(100/percent);
		//this.voice.setFilter(detune);

		const maxFilter:number = 127;
		const filter:number = maxFilter * percent/100;
		this.voice.setFilter(filter);

		this.yRange.nativeElement.value = -percent;
	}
	//
	// public percentLinearToLog( n:number )
	// {
	// 	if( n <= 0 )
	// 		return 0;
	//
	// 	const minLog:number =  Math.log10(1);
	// 	const maxLog:number = Math.log10(100);
	// 	const range:number = maxLog - minLog;
	//
	// 	//return (Math.exp(n)-1)/(Math.E-1);
	//
	// 	return 100*(Math.log10(n) - minLog) / range;
	// }
}