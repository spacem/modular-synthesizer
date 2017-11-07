/**
 * Model used to populate the piano keys.
 * @see https://en.wikipedia.org/wiki/Piano_key_frequencies
 */
import {Key} from './key';

export class KeyboardLayout
{
	public readonly keys:Key[];
	public readonly minKey:number;
	public readonly maxKey:number;

	constructor( minKey:number=24, maxKey:number=84 )
	{
		this.minKey = minKey;
		this.maxKey = maxKey;
		this.keys = KeyboardLayout.generateKeys( minKey, maxKey );
	}

	/**
	 * Generate the keyboard layout keys model.
	 *
	 * @param {number} minKey
	 * 	Lower key on the keyboard layout.
	 *
	 * @param {number} maxKey
	 * 	Upper key on the keyboard layout.
	 *
	 * @return {Key[]}
	 * 	The generated keyboard layout.
	 */
	public static generateKeys( minKey:number, maxKey:number ):Key[]
	{
		const keys:Key[] = [];
		for( let i=minKey; i<=maxKey; i++ )
		{
			const octave = Math.floor(i/12);
			const note = i%12;
			const key:Key = new Key(octave,note);

			keys.push(key);
		}
		console.log(keys);
		return keys;
	}
}
