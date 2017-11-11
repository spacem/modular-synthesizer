/**
 * Model used to populate the piano keys.
 * @see https://en.wikipedia.org/wiki/Piano_key_frequencies
 */
import {Note} from './note';

// We don't really need a Key object model, so let's use an interface instead.
interface Key {
	note:Note;
	number:number;
}

export class KeyboardLayout
{
	public readonly keys:Key[];

	public readonly minKey:number;
	public readonly maxKey:number;

	/**
	 * Build the keyboard layout choosing its min and max key.
	 *
	 * @param {number} minKey
	 * @param {number} maxKey
	 */
	constructor( minKey:number=48, maxKey:number=120 )
	{
		this.minKey = minKey;
		this.maxKey = maxKey;
		this.keys = KeyboardLayout.generateKeys( minKey, maxKey );
	}

	/**
	 * Generate the keyboard layout using notes as keys.
	 *
	 * @param {number} minKey
	 * 	Lower key on the keyboard layout.
	 *
	 * @param {number} maxKey
	 * 	Upper key on the keyboard layout.
	 *
	 * @return {Note[]}
	 * 	The generated keyboard layout.
	 */
	public static generateKeys( minKey:number, maxKey:number ):Key[]
	{
		const keys:Key[] = [];
		for( let i=minKey; i<=maxKey; i++ )
		{
			const octave = Math.floor(i/12);

			// @see https://stackoverflow.com/questions/18618136/how-to-calculate-modulo-of-negative-integers-in-javascript
			const noteNumberInOctave = (i%12+12)%12;

			keys.push({note:new Note(octave,noteNumberInOctave), number:i});
		}

		console.log(keys);

		return keys;
	}
}
