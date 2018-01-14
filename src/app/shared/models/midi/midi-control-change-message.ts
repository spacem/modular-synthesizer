export class MidiControlChangeMessage
{
	/**
	 * Build a MIDI «Control Change» message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel to which the «Control Change» message is sent (from 0 to 15).
	 *
	 * @param {number} control
	 * 	The control number associated to the message (from 0 to 127).
	 *
	 * @param {number} value
	 * 	The velocity of the note to take into account (from 0 to 127).
	 */
	constructor
	(
		readonly channel:number,
		readonly control:number,
		readonly value:number
	){}
}
