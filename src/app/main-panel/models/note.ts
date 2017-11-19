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

	public frequency:number=0;

	/**
	 * Calculate the note frequency where A4(440Hz) is note with a value of 0.
	 *
	 * @param {number} note
	 * 	The key number for which to calculate the frequency.
	 *
	 * @return {number}
	 * 	The calculated frequency of the note.
	 */
	private static noteToFrequency( note:number ):number
	{
		return Math.pow(2,(note-1)/12 ) * 440.0;
	}

	/**
	 * Build a key referring its octave and its note position on the given octave.
	 *
	 * @param {number} octave
	 * 	The key octave.
	 *
	 * @param {number} note
	 * 	The note number in the given octave (or in the keyboard layout starting from C0).
	 */
	constructor( octave:number=0, note:number=0 )
	{
		// Force the note to be contained in the 0 and 11 range.
		this.noteNumberInOctave = Math.abs(note)%12;

		const octaveKey = Note.octave[this.noteNumberInOctave];

		this.number = octave*12 + note;
		this.octave = octave;
		this.accidental= octaveKey.accidental;
		this.fr = octaveKey.fr;
		this.en = octaveKey.en;
		this.scientificName = octaveKey.en + octave;

		/*
		 * -56 = 0 - 8 - 48 :
		 * 	-8 // We are talking with C notes as reference on octaves, but frequencies use A notes as reference.
		 * 	-48 // Distance on the chromatic scale between C4 and C0 note.
		 */
		this.frequency = Note.noteToFrequency(this.number - 56 );
	}
}