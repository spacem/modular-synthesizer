export class ToneHelper
{
	/**
	 * Calculate the note frequency where C-1 is the zero note (A4 is note #69 when referring to C-1…).
	 *
	 * @see https://en.wikipedia.org/wiki/Scientific_pitch_notation
	 * @see https://en.wikipedia.org/wiki/Piano_key_frequencies
	 * @see https://en.wikipedia.org/wiki/Musical_keyboard#/media/File:Frequencies_of_the_audible_range_on_a_twelve_and_eight_equal_tempered_scale.jpg
	 *
	 * @param {number} note
	 * 	The key number for which to calculate the frequency.
	 *
	 * @return {number}
	 * 	The calculated frequency of the note.
	 */
	public static noteToFrequency( note:number ):number
	{
		return Math.pow(2,(note-69)/12 ) * 440.0;
	}
}
