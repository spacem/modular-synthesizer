import { Component, ElementRef, ViewChild } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Voice } from '../../../../shared/models/voice/voice';
import { IInputController } from '../../../models/iinput-controller';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { Note } from '../../../../shared/models/note/note';
import { Subscription } from 'rxjs/Subscription';
import { MidiNoteMessage } from '../../../../shared/models/midi/midi-note-message';
import { MidiHelper } from '../../../../shared/helpers/midi/midi-helper';
import { KeyboardKeysComponent } from './keyboard-keys/keyboard-keys.component';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements IInputController
{
	private static POLYPHONY:number = 4;

	private voice:Voice;
	private channel:number = 1;
	private noteSubsription:Subscription;

	@ViewChild('keyboard') keyboard:KeyboardKeysComponent;

	// FIFO of active oscillators on the voice, each entry is a keyboard note number.
	private activeOscs:number[] = Array.from({length:KeyboardComponent.POLYPHONY});

	constructor(private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService){}

	public connect():void
	{
		if( this.voice )
			this.voice.disconnect();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = Voice.createVoice(this.mainPanelService.getMainGain(),KeyboardComponent.POLYPHONY);
		this.voice.setWaveformType('sine');

		// FIXME Does it really need to be here (it reflect the key of any external keyboard device attached to the same channel) ?
		this.noteSubsription = this.webMIDIService.noteSource$.subscribe( (midiNoteMessage:MidiNoteMessage) =>
		{
			const notes:Note[] = this.keyboard.notes;
			const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);
			const firstInactiveIndex:number = this.activeOscs.findIndex( activeNote => !notes[activeNote] || !notes[activeNote].on );
			const alreadyActiveIndex:number = this.activeOscs.findIndex( activeNote => activeNote === midiNoteMessage.note );

			// Play or unplay note depending on the note is off or its velocity is zeroed.
			if( note.on && note.velocity>0 )
			{
				// Reuse the old allocated index for the note when it already is played.
				if( alreadyActiveIndex >= 0 )
					this.activeOscs[alreadyActiveIndex] = note.number;
				else
					this.activeOscs[firstInactiveIndex] = note.number;
			}
			else
			{
				this.activeOscs[firstInactiveIndex] = undefined;
			}

			//const tones:number[] = this.activeNotes.map( activeNote => activeNote && activeNote.on ? activeNote.frequency : undefined );

			//this.voice.setTone( index, tone );
		});
	}

	public disconnect():void
	{
		this.voice.disconnect();
		this.noteSubsription.unsubscribe();
	}

	public keyDown( note:Note )
	{
		console.log( 'down:', note );

		this.webMIDIService.sendMIDINote( this.channel, note.number, 127, true );
	}

	public keyUp( note:Note )
	{
		console.log( 'up:', note );

		this.webMIDIService.sendMIDINote( this.channel, note.number, 0, false );
	}
}
