export class MidiNoteMessage
{
	/**
	 * Build a MIDI «Note» message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel to which the «Note» message is sent (from 0 to 15).
	 *
	 * @param {number} note
	 * 	The note to take into account (from 0 to 127).
	 *
	 * @param {number} velocity
	 * 	The velocity of the note to take into account (from 0 to 127).
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
