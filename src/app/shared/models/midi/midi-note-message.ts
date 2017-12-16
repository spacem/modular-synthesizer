export class MidiNoteMessage
{
	/**
	 * Build a note MIDI message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel on which the «Note On/Off» message occurred.
	 *
	 * @param {number} note
	 * 	The note to take into account (with C-1 as reference zero note and G-9 as upper note, following MIDI standard).
	 *
	 * @param {number} velocity
	 * 	The velocity of the note to take into account (from 0 to 127, following MIDI standard).
	 *
	 * @param {boolean} on
	 * 	The note on or off state.
	 */
	constructor
	(
		readonly channel:number,
		readonly note:number,
		readonly velocity:number,
		readonly on:boolean
	){}
}
