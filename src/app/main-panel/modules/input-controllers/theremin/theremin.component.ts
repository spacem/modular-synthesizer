import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import * as Tone from 'tone';
import { KeyboardKeysComponent } from '../keyboard/keyboard-keys/keyboard-keys.component';

@Component( {
	selector: 'app-theremin',
	templateUrl: './theremin.component.html',
	styleUrls: [ './theremin.component.scss' ]
} )
export class ThereminComponent implements OnInit, OnDestroy, Connectible, MidiDevice
{
	public static readonly MIN_FREQUENCY:number = 60;
	public static readonly MAX_FREQUENCY:number = 1000; //TODO Limit to the current sound card sample rate

	public static readonly MIN_VOICE:number = 1;
	public static readonly MAX_VOICE:number = 16;

	@ViewChild('pad') pad:ElementRef;
	@ViewChild('dot') dot:ElementRef;
	@ViewChild('voices') voices:ElementRef;

	public easings:(keyof EasingHelper)[] = EasingHelper.easings;
	public waveforms:OscillatorType[] =
	[
		'sawtooth',
		'sine',
		'square',
		'triangle'
	];

	public midiMute:boolean;
	public midiChannel:number = 2;
	public midiProgram:number;
	public midiPitch:number;

	public easing:keyof EasingHelper = 'easeInExpo';
	public voiceNumber:number = 1;
	public waveform:OscillatorType = 'sine';

	public minVoice:number = ThereminComponent.MIN_VOICE;
	public maxVoice:number = ThereminComponent.MAX_VOICE;

	public minFrequency:number = ThereminComponent.MIN_FREQUENCY;
	public maxFrequency:number = ThereminComponent.MAX_FREQUENCY;

	public logarithmicX:boolean = true;

	private midiNoteSubscription:Subscription;
	private midiProgramSubscription:Subscription;
	private midiControlSubscription:Subscription;
	private synth:Tone.PolySynth;

	public notes:Note[];

	// @see https://stackoverflow.com/questions/846221/logarithmic-slider
	public static logarithmicScale
	(
		value:number,
		minFrom:number, maxFrom:number,
		minTo:number, maxTo:number
	):number
	{
		const minLog = Math.log(minTo+.00000000000000000001);
		const maxLog = Math.log(maxTo+.00000000000000000001);

		// calculate adjustment factor
		const scale = (maxLog-minLog) / (maxFrom-minFrom);

		return Math.exp(minLog + scale*(value-minTo));
	}

	constructor( private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService, private easingHelper:EasingHelper ){}

	public ngOnInit():void
	{
		this.notes = Array(10);
	}

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
		this.synth.triggerAttack(tone);
	}

	public setWaveform( waveformType:OscillatorType ):void
	{
		this.connect();
		this.waveform = waveformType;
	}

	public connect():void
	{
		// Always disconnect first.
		this.disconnect();

		this.synth = new Tone.PolySynth(6, Tone.Synth, {
			'oscillator' : {
				'type': this.waveform,
				'partials' : [0, 2, 3, 4],
			}
		}).toMaster();

		//this.setWaveform(this.waveform);
		//this.setX(0);
		//this.setY(0);

		this.midiConnect();
	}

	public disconnect():void
	{
		this.midiDisconnect();

		if( this.synth )
			this.synth.dispose();
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
				this.setWaveform( this.waveforms[midiProgramChangeMessage.program%4] );
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
		number = Math.max(this.minVoice, Math.min(Number(number), this.maxVoice));

		// Prevent WebMIDI to flood us with control messages at an incredible high rate (investigate possible bug).
		if( number === this.voiceNumber )
			return;

		this.voiceNumber = number;
		this.connect();
	}

	public setEasing( easing:keyof EasingHelper ):void
	{
		this.easing = easing ;
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

		//const eased = this.easingHelper.easeInQuart( percent, minValue, maxValue-minValue, 100 );

		if( this.logarithmicX )
			this.setTone( ThereminComponent.logarithmicScale( percent, 0,100, this.minFrequency, this.maxFrequency ) );
		else
			this.setTone( (this.maxFrequency-this.minFrequency)*(percent/100) );

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
		const maxDetune:number = 6.8;
		const detune:number = maxDetune*(100/(1+percent)) - 3.4;

		percent = Number(percent);

		// const maxFilter:number = 127;
		// const filter:number = maxFilter * percent/100;
		// this.voice.setDetune(filter);

		this.dot.nativeElement.style.top = percent + '%';
	}

	/**
	 * Set the minimum frequency the pad can play on the tone coordinate.
	 *
	 * @param {number} frequency
	 * 	The minimum frequency the pad can play on the tone coordinate.
	 */
	public setMinFrequency( frequency:number ):void
	{
		this.minFrequency = Number(frequency);
		this.connect();
	}

	/**
	 * Set the maximum frequency the pad can play on the tone coordinate.
	 *
	 * @param {number} frequency
	 * 	The maximum frequency the pad can play on the tone coordinate.
	 */
	public setMaxFrequency( frequency:number ):void
	{
		this.maxFrequency = Number(frequency);
		this.connect();
	}

	/**
	 * Evaluate the X coordinate value on a logarithmic scale.
	 *
	 * @param {boolean} logarithmicX
	 * 	Evaluate the X coordinate value on a logarithmic scale.
	 */
	public setLogarithmicX( logarithmicX:boolean ):void
	{
		this.logarithmicX = logarithmicX;
	}
}