import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Tone from 'tone';
import { EasingHelper } from '../../../../shared/helpers/easing/easing-helper';
import { MathHelper } from '../../../../shared/helpers/math/math-helper';
import { MidiHelper } from '../../../../shared/helpers/midi/midi-helper';
import { ToneHelper } from '../../../../shared/helpers/tone/tone-helper';
import { WebAudioHelper } from '../../../../shared/helpers/webaudio/webaudio-helper';
import { Note } from '../../../../shared/models/note/note';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { Connectible } from '../../../models/connectable.interface';
import { MidiDevice } from '../../../models/midi-device.interface';

@Component( {
	selector: 'app-theremin',
	templateUrl: './theremin.component.html',
	styleUrls: [ './theremin.component.scss' ]
} )
export class ThereminComponent implements OnInit, OnDestroy, Connectible, MidiDevice
{
	public static readonly MIN_FREQUENCY:number = 60;
	public static readonly MAX_FREQUENCY:number = 24000; //TODO Limit to the current sound card sample rate

	public static readonly MIN_VOICE:number = 1;
	public static readonly MAX_VOICE:number = 16;

	@ViewChild('pad') pad:ElementRef;
	@ViewChild('dot') dot:ElementRef;
	@ViewChild('voices') voices:ElementRef;

	public easings:(keyof EasingHelper)[] = EasingHelper.easings;
	public waveforms:OscillatorType[] = WebAudioHelper.WAVES;

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

	private x:number = 0;
	private y:number = 0;

	public logarithmicX:boolean = true;

	private midiNoteSubscription:Subscription;
	private midiProgramSubscription:Subscription;
	private midiControlSubscription:Subscription;
	private synth:Tone.Synth;

	constructor( private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService, private easingHelper:EasingHelper ){}

	public ngOnInit():void{}

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
		if( this.synth )
			this.synth.triggerAttack(Array(this.voiceNumber).fill(tone));
	}

	public setWaveform( waveformType:OscillatorType ):void
	{
		this.waveform = waveformType;
		this.synth.set(
		{
			oscillator: {
				type: this.waveform
			},
		});
	}

	public connect():void
	{
		// Always disconnect first.
		this.disconnect();

		this.synth = new Tone.PolySynth(this.voiceNumber, Tone.Synth,
		{
			detune : 0,
			oscillator : {
				type : this.waveform
			},
			filter : {
				Q : 6,
				type : 'lowpass',
				rolloff : -24
			},
			envelope : {
				attack : 0,
				decay : 0,
				sustain : 1,
				release : 1
			},
			filterEnvelope : {
				attack : 0,
				decay : 0,
				sustain : 1,
				release : 2,
				baseFrequency : 600,
				octaves : 4,
				exponent : 2
			},
			partials : [0, 2, 3, 4],
		}).toMaster();

		this.setX(this.x);
		this.setY(this.y);

		this.midiConnect();

	}

	public disconnect():void
	{
		this.midiDisconnect();

		if( this.synth )
		{
			this.synth.dispose();
			this.synth = null;
		}
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
		//if( number === this.voiceNumber )
		//	return;

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
			this.setTone( MathHelper.logarithmicScale( percent, 0,100, this.minFrequency, this.maxFrequency ) );
		else
			this.setTone( (this.maxFrequency-this.minFrequency)*(percent/100) );

		this.dot.nativeElement.style.left = percent + '%';
		this.x = percent;
	}

	/**
	 * Set the current Y position of the pointer on the pad.
	 *
	 * @param {number} percent
	 * 	The current Y position of the pointer on the pad (expressed in percent)
	 */
	public setY( percent:number ):void
	{
		const minVolume:number = -40;
		const maxVolume:number = 0;

		percent = Number(percent);

		if( this.synth )
			this.synth.set( {volume: MathHelper.percentToRange(percent,minVolume,maxVolume)} );

		this.dot.nativeElement.style.top = percent + '%';
		this.y = percent;
	}

	/**
	 * Set the minimum frequency the pad can play on the tone axis.
	 *
	 * @param {number} frequency
	 * 	The minimum frequency the pad can play on the tone axis.
	 */
	public setMinFrequency( frequency:number ):void
	{
		this.minFrequency = Number(frequency);
		this.connect();
	}

	/**
	 * Set the maximum frequency the pad can play on the tone axis.
	 *
	 * @param {number} frequency
	 * 	The maximum frequency the pad can play on the tone axis.
	 */
	public setMaxFrequency( frequency:number ):void
	{
		this.maxFrequency = Number(frequency);
		this.connect();
	}

	/**
	 * Evaluate the X axis value on a logarithmic scale.
	 *
	 * @param {boolean} logarithmicX
	 * 	Evaluate the X axis value on a logarithmic scale.
	 */
	public setLogarithmicX( logarithmicX:boolean ):void
	{
		this.logarithmicX = logarithmicX;
		this.connect();
	}
}