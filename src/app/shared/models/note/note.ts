import { ToneHelper } from '../../helpers/tone/tone-helper';

export class Note
{
	/**
	 * Chromatic scale octave base reference with scientific pitch notation.
	 *
	 * @see https://en.wikipedia.org/wiki/Chromatic_scale
	 */
	private static octave =
	[
		{ en:'C', fr:'do', accidental:false},
		{ en:'C#', fr:'do#', accidental:true},
		{ en:'D', fr:'ré', accidental:false},
		{ en:'D#', fr:'ré#', accidental:true},
		{ en:'E', fr:'mi', accidental:false},
		{ en:'F', fr:'fa', accidental:false},
		{ en:'F#', fr:'fa#', accidental:true},
		{ en:'G', fr:'sol', accidental:false},
		{ en:'G#', fr:'sol#',accidental:true},
		{ en:'A', fr:'la', accidental:false},
		{ en:'A#', fr:'la#', accidental:true},
		{ en:'B', fr:'si', accidental:false}
	];

	public readonly number:number=0;
	public readonly octave:number=0;
	public readonly noteNumberInOctave:number=0;
	public readonly accidental:boolean=false;
	public readonly fr:string;
	public readonly en:string;

	/**
	 * @see https://en.wikipedia.org/wiki/Scientific_pitch_notation
	 */
	public scientificName:string;

	/**
	 * Note base frequency.
	 *
	 * @type {number}
	 */
	public frequency:number = 0;

	/**
	 * Note velocity.
	 *
	 * @type {number}
	 */
	public velocity:number = 127;

	/**
	 * Current state of the note (on or off).
	 *
	 * @type {boolean}
	 */
	public on:boolean = false;

	/**
	 * Build a note object referring to its note position using C-1 (first note of the zero octave) as the reference zero
	 * note.
	 *
	 * @param {number} noteNumber
	 * 	The note number referring to its note position using C-1 as the reference zero note.
	 */
	constructor( noteNumber:number=0 )
	{
		if( isNaN(Number(noteNumber)) )
			throw( Error(`Note range error, invalid note number: ${noteNumber}`) );

		// C-1 reference zero note, is obviously on the octave -1.
		const octave = Math.floor(noteNumber/12 ) -1;

		// Force the note to be contained in the 0 and 11 range.
		// @see https://stackoverflow.com/questions/18618136/how-to-calculate-modulo-of-negative-integers-in-javascript
		this.noteNumberInOctave = Math.abs((noteNumber%12+12)%12);

		const octaveKey = Note.octave[this.noteNumberInOctave];

		this.number = noteNumber;
		this.octave = octave;
		this.accidental= octaveKey.accidental;
		this.fr = octaveKey.fr;
		this.en = octaveKey.en;
		this.scientificName = octaveKey.en + octave;

		this.frequency = ToneHelper.noteToFrequency(this.number);
	}
}