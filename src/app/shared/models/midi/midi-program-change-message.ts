export class MidiProgramChangeMessage
{
	/**
	 * Build a MIDI «Program Change» message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel to which the «Program Change» message is sent (from 0 to 15).
	 *
	 * @param {number} program
	 * 	The new program number on which to map MIDI notes for this channel.
	 */
	constructor
	(
		readonly channel:number,
		readonly program:number
	){}
}
