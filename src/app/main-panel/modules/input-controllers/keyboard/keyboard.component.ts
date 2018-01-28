import { Component, OnDestroy, ViewChild } from '@angular/core';
import { WebAudioHelper } from '../../../../shared/helpers/webaudio/webaudio-helper';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Connectible } from '../../../models/connectable.interface';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { Note } from '../../../../shared/models/note/note';
import { Subscription } from 'rxjs/Subscription';
import { MidiHelper } from '../../../../shared/helpers/midi/midi-helper';
import { KeyboardKeysComponent } from './keyboard-keys/keyboard-keys.component';
import { MidiDevice } from '../../../models/midi-device.interface';
import * as Tone from 'tone';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnDestroy, Connectible, MidiDevice
{
	private static POLYPHONY:number = 12;

	public midiMute:boolean;
	public midiChannel:number = 1;
	public midiProgram:number;
	public midiPitch:number;

	public waveform:OscillatorType = 'sine';
	public waveforms:OscillatorType[] = WebAudioHelper.WAVES;

	private synth:Tone.MonoSynth;
	private midiNoteSubscription:Subscription;
	private midiProgramSubscription:Subscription;

	@ViewChild('keyboard') keyboard:KeyboardKeysComponent;

	constructor( private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService ){}

	ngOnDestroy()
	{
		this.disconnect();
	}

	public connect():void
	{
		// Always disconnect first
		this.disconnect();

		this.synth = new Tone.PolySynth(KeyboardComponent.POLYPHONY, Tone.Synth,
		{
			detune : 0,
			volume:0,
			oscillator : {
				type : this.waveform
			},
			filter : {
				Q : 6,
				type : 'lowpass',
				rolloff : -24
			},
			envelope : {
				attack : .25,
				decay : .5,
				sustain : 5,
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

	public midiConnect()
	{
		// FIXME Does it really need to be here (it reflect the key of any external keyboard device attached to the same channel) ?
		this.midiNoteSubscription = this.webMIDIService.noteSource$.subscribe( midiNoteMessage =>
		{
			if( midiNoteMessage.channel === this.midiChannel )
			{
				const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);
				this.playNote(note);
			}
		});

		this.midiProgramSubscription = this.webMIDIService.programSource$.subscribe(midiProgramChangeMessage =>
		{
			if( midiProgramChangeMessage.channel === this.midiChannel )
				this.setWaveform( this.waveforms[midiProgramChangeMessage.program%4] );
		});
	}

	public midiDisconnect()
	{
		if( this.midiNoteSubscription )
			this.midiNoteSubscription.unsubscribe();

		if( this.midiProgramSubscription )
			this.midiProgramSubscription.unsubscribe();
	}

	private playNote( note:Note )
	{
		// Update notes state on keyboard.
		const notes:Note[] = this.keyboard.notes;
		notes.every( value =>
		{
			if( value.number === note.number )
			{
				value.on = note.on;
				value.velocity = note.velocity;
				return false;
			}

			return true;
		});

		// 0 -> 1
		const velocity:number = note.velocity/127;

		if( note.on )
			this.synth.triggerAttack(note.frequency,this.synth.now(),velocity);
		else
			this.synth.triggerRelease(note.frequency,this.synth.now(),velocity);
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

	public keyDown( note:Note )
	{
		console.log( 'down:', note );

		this.webMIDIService.sendMIDINote( this.midiChannel, note.number, 127, true );
	}

	public keyUp( note:Note )
	{
		console.log( 'up:', note );

		this.webMIDIService.sendMIDINote( this.midiChannel, note.number, 0, false );
	}
}
