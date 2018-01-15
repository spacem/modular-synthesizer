import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Subscription } from 'rxjs/Subscription';
import { PolyphonicOscillator } from '../../../../shared/models/polyphonic-oscillator/polyphonic-oscillator';
import { EasingHelper } from '../../../../shared/helpers/easing/easing-helper';
import { Connectible } from '../../../models/connectable.interface';
import { ToneHelper } from '../../../../shared/helpers/tone/tone-helper';
import { MidiDevice } from '../../../models/midi-device.interface';
import { MidiHelper } from '../../../../shared/helpers/midi/midi-helper';
import { Note } from '../../../../shared/models/note/note';

@Component( {
	selector: 'app-theremin',
	templateUrl: './theremin.component.html',
	styleUrls: [ './theremin.component.scss' ]
} )
export class ThereminComponent implements OnDestroy, Connectible, MidiDevice
{
	public static readonly MIN_FREQUENCY:number = 60;
	public static readonly MAX_FREQUENCY:number = 250;

	@ViewChild('waveform') waveform:ElementRef;
	@ViewChild('pad') pad:ElementRef;
	@ViewChild('voices') voices:ElementRef;
	@ViewChild('dot') dot:ElementRef;

	public midiMute:boolean;
	public midiChannel:number = 2;
	public midiProgram:number;
	public midiPitch:number;

	private midiNoteSubscription:Subscription;
	private midiProgramSubscription:Subscription;
	private midiControlSubscription:Subscription;
	private voice:PolyphonicOscillator;

	constructor( private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService, private easingHelper:EasingHelper ){}

	ngOnDestroy()
	{
		this.disconnect();
	}

	public playNote( note:Note ):void
	{
		if( note.on && note.velocity>0 && note.frequency>0 )
		{
			const percent:number = 100/(ToneHelper.noteToFrequency(128)/note.frequency);
			this.setX(percent);
		}
		else
			this.setTone(0);
	}

	public setTone( tone:number ):void
	{
		const tones:number[] = Array.from({length:this.voice.getOscillatorsNumber()} ).map( (value, index) => (index+1)*tone );

		//TODO Create a multiplexer component for this.
		tones.forEach( (value,index) => this.voice.setTone( value, -1, index ) );
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.voice.setWaveformType(waveformType);
		this.waveform.nativeElement.value = waveformType;
	}

	public connect():void
	{
		// Always disconnect first.
		this.disconnect();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = PolyphonicOscillator.create(this.mainPanelService.getMainGain(),+this.voices.nativeElement.value);
		this.setWaveformType(this.waveform.nativeElement.value);
		this.setX(0);
		this.setY(0);

		this.midiConnect();
	}

	public disconnect():void
	{
		this.midiDisconnect();

		if( this.voice )
			this.voice.disconnect();
	}

	//TODO Implement
	public start(){}
	public stop(){}

	public midiConnect()
	{
		this.midiNoteSubscription = this.webMIDIService.noteSource$.subscribe(midiNoteMessage =>
		{
			if( midiNoteMessage.channel === this.midiChannel )
			{
				const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);
				this.playNote(note);
			}
		} );

		this.midiProgramSubscription = this.webMIDIService.programSource$.subscribe(midiProgramChangeMessage =>
		{
			if( midiProgramChangeMessage.channel === this.midiChannel )
				this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][midiProgramChangeMessage.program%4] as OscillatorType );
		});

		this.midiControlSubscription = this.webMIDIService.controlSource$.subscribe(midiControlChangeMessage =>
		{
			if( midiControlChangeMessage.channel === this.midiChannel )
			{
				switch( midiControlChangeMessage.control )
				{
					case 64:
						this.setVoices(midiControlChangeMessage.value);
					break;

					default:
						console.warn(`The control ${midiControlChangeMessage.control} is not handled by Theremin`);
				}
			}
		});
	}

	public setVoices( number:number ):void
	{
		number = Math.max(+this.voices.nativeElement.min, Math.min(Number(number), +this.voices.nativeElement.max));

		// Prevent WebMIDI to flood us with control messages at an incredible high rate (investigate possible bug).
		if( number === this.voice.getOscillatorsNumber() )
			return;

		this.voices.nativeElement.value = number ;
		this.connect();
	}

	public midiDisconnect()
	{
		if( this.midiNoteSubscription )
			this.midiNoteSubscription.unsubscribe();

		if( this.midiProgramSubscription )
			this.midiProgramSubscription.unsubscribe();
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
		percent = Number(percent);

		const minValue = ThereminComponent.MIN_FREQUENCY;
		const maxValue = ThereminComponent.MAX_FREQUENCY;
		const eased = percent >= 100 ? 100 : this.easingHelper.easeInExpo( percent, minValue, maxValue-minValue, 100 );

		this.setTone(eased);

		this.dot.nativeElement.style.left = percent + '%';
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
		//this.polyphonic-oscillator.setFilter(detune);

		percent = Number(percent);

		const maxFilter:number = 127;
		const filter:number = maxFilter * percent/100;
		this.voice.setFilter(filter);

		this.dot.nativeElement.style.top = percent + '%';
	}
}