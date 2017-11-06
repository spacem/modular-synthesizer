export class Key
{
	private static octave =
	[
		{ en:'C', fr:'do', accidental:false},
		{ en:'C#', fr:'do#', accidental:true},
		{ en:'D', fr:'ré', accidental:false},
		{ en:'D#', fr:'ré#', accidental:true},
		{ en:'E', fr:'mi', accidental:false},
		{ en:'E#', fr:'mi#', accidental:true},
		{ en:'F', fr:'fa', accidental:false},
		{ en:'G', fr:'sol', accidental:false},
		{ en:'G#', fr:'sol#',accidental:true},
		{ en:'A', fr:'la', accidental:false},
		{ en:'A#', fr:'la#', accidental:true},
		{ en:'B', fr:'si', accidental:false}
	];

	public number:number=0;
	public octave:number=0;
	public accidental:boolean=false;
	public fr:string;
	public en:string;
	public scientificName:string;
	public frequency:number=0;

	/**
	 * Calculate the key frequency using C0 as note zero.
	 *
	 * @param {number} note
	 * 	The note number for which to calculate the frequency.
	 *
	 * @return {number}
	 * 	The calculated frequency of the note.
	 */
	private static noteToFrequency( note:number ):number
	{
		return Math.pow(2, (note - 49) / 12) * 440.0;
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
		const octaveKey = Key.octave[note%12];

		this.number = octave*12 + note;
		this.octave = octave;
		this.accidental= octaveKey.accidental;
		this.fr = octaveKey.fr;
		this.en = octaveKey.en;
		this.scientificName = octaveKey.en + octave;
		this.frequency = Key.noteToFrequency(this.number-8);
	}
}