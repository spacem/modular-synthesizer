import { MidiHelper } from './midi-helper';
import { MidiNoteMessage } from '../../models/midi/midi-note-message';
import { Note } from '../../models/note/note';

describe( 'MidiHelper', () =>
{
	it( 'should create an instance', () =>
	{
		expect( new MidiHelper() ).toBeTruthy();
	} );

	it( 'should reflect the created MidiNoteMessage when default values are set', () =>
	{
		const channel:number = 0;
		const number:number = 0;
		const velocity:number = 0;
		const on:boolean = false;

		const midiNoteMessage:MidiNoteMessage = new MidiNoteMessage(channel,number,velocity,on);
		const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);

		expect( note.number ).toBe(number);
		expect( note.velocity ).toBe(velocity);
		expect( note.on ).toBe(on);
	} );

	it( 'should reflect the created MidiNoteMessage even when a channel is set', () =>
	{
		const channel:number = 16;
		const number:number = 0;
		const velocity:number = 0;
		const on:boolean = false;

		const midiNoteMessage:MidiNoteMessage = new MidiNoteMessage(channel,number,velocity,on);
		const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);

		expect( note.number ).toBe(number);
		expect( note.velocity ).toBe(velocity);
		expect( note.on ).toBe(on);
	} );

	it( 'should reflect the created MidiNoteMessage when note number is set', () =>
	{
		const channel:number = 0;
		const number:number = 16;
		const velocity:number = 0;
		const on:boolean = false;

		const midiNoteMessage:MidiNoteMessage = new MidiNoteMessage(channel,number,velocity,on);
		const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);

		expect( note.number ).toBe(number);
		expect( note.velocity ).toBe(velocity);
		expect( note.on ).toBe(on);
	} );

	it( 'should reflect the created MidiNoteMessage when velocity is set', () =>
	{
		const channel:number = 0;
		const number:number = 0;
		const velocity:number = 127;
		const on:boolean = false;

		const midiNoteMessage:MidiNoteMessage = new MidiNoteMessage(channel,number,velocity,on);
		const note:Note = MidiHelper.createNoteFromMidiNote(midiNoteMessage);

		expect( note.number ).toBe(number);
		expect( note.velocity ).toBe(velocity);
		expect( note.on ).toBe(on);
	} );
} );
