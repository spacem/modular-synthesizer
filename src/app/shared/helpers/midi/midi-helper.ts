import { Injectable } from '@angular/core';
import { MidiNoteMessage } from '../../models/midi/midi-note-message';
import { Note } from '../../models/note/note';

@Injectable()
export class MidiHelper
{
	public static createNoteFromMidiNote( midiNoteMessage:MidiNoteMessage ):Note
	{
		const note:Note = new Note(midiNoteMessage.note,midiNoteMessage.velocity);
		note.on = midiNoteMessage.on;

		return note;
	}
}
