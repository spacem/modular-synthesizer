export class MidiProgramChangeMessage
{
	/**
	 * Build a «Program Change» MIDI message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel on which the program change occurred.
	 *
	 * @param {number} program
	 * 	The new program number on which to map MIDI notes for this channel.
	 */
	constructor( readonly channel:number, readonly program:number ){}
}
