import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Voice } from '../../../../shared/models/voice/voice';
import { Connectible } from '../../../models/connectable.interface';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { Note } from '../../../../shared/models/note/note';
import { Subscription } from 'rxjs/Subscription';
import { MidiHelper } from '../../../../shared/helpers/midi/midi-helper';
import { KeyboardKeysComponent } from './keyboard-keys/keyboard-keys.component';
import { MidiDevice } from '../../../models/midi-device.interface';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnDestroy, Connectible, MidiDevice
{
	private static POLYPHONY:number = 128;

	public midiMute:boolean;
	public midiChannel:number = 1;
	public midiProgram:number;
	public midiPitch:number;

	private voice:Voice;
	private midiNoteSubscription:Subscription;
	private midiProgramSubscription:Subscription;

	@ViewChild('keyboard') keyboard:KeyboardKeysComponent;
	@ViewChild('waveform') waveform:ElementRef;

	// FIFO of active oscillators on the voice, each entry is a keyboard note number.
	private activeOscs:number[] = Array.from({length:KeyboardComponent.POLYPHONY});

	constructor( private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService ){}

	ngOnDestroy()
	{
		this.disconnect();
	}

	public connect():void
	{
		// Always disconnect first
		this.disconnect();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = Voice.createVoice(this.mainPanelService.getMainGain(),KeyboardComponent.POLYPHONY);
		this.setWaveformType(this.waveform.nativeElement.value);

		this.midiConnect();
	}

	public disconnect():void
	{
		this.midiDisconnect();

		if( this.voice )
			this.voice.disconnect();
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
				this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][midiProgramChangeMessage.program%4] as OscillatorType );
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

		//TODO FIFO active oscillators.
		notes.forEach( (value,index) =>
		{
			if(this.voice)
				this.voice.setTone( index, value.on && value.velocity >= 0 ? value.frequency : 0);
		});
	}

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.voice.setWaveformType(waveformType);
		this.waveform.nativeElement.value = waveformType;
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
