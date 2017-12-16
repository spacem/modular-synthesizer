import { ToneHelper } from './tone-helper';

describe( 'ToneHelper', () =>
{
	it( 'should create an instance', () =>
	{
		expect( new ToneHelper() ).toBeTruthy();
	} );

	it( 'should create an instance', () =>
	{
		//@see https://en.wikipedia.org/wiki/Scientific_pitch_notation
		const notes =
		[
			// Octave −1
			[ 'C-1', 8.176, 0 ],
			[ 'C♯/D♭-1', 8.662, 1 ],
			[ 'D-1', 9.177, 2 ],
			[ 'E♭/D♯-1', 9.723, 3 ],
			[ 'E-1', 10.301, 4 ],
			[ 'F-1', 10.914, 5 ],
			[ 'F♯/G♭-1', 11.563, 6 ],
			[ 'G-1', 12.249, 7 ], // Modified from 12.250 for our needs
			[ 'A♭/G♯-1', 12.979, 8 ],
			[ 'A-1', 13.750, 9 ],
			[ 'B♭/A♯-1', 14.568, 10 ],
			[ 'B-1', 15.434, 11 ],

			// Octave 0
			[ 'C0', 16.352, 12 ],
			[ 'C♯/D♭0', 17.324, 13 ],
			[ 'D0', 18.354, 14 ],
			[ 'E♭/D♯0', 19.445, 15 ],
			[ 'E0', 20.602, 16 ],
			[ 'F0', 21.827, 17 ],
			[ 'F♯/G♭0', 23.125, 18 ],
			[ 'G0', 24.500, 19 ],
			[ 'A♭/G♯0', 25.957, 20 ],
			[ 'A0', 27.500, 21 ],
			[ 'B♭/A♯0', 29.135, 22 ],
			[ 'B0', 30.868, 23 ],

			// Octave 1
			[ 'C1', 32.703, 24 ],
			[ 'C♯/D♭1', 34.648, 25 ],
			[ 'D1', 36.708, 26 ],
			[ 'E♭/D♯1', 38.891, 27 ],
			[ 'E1', 41.203, 28 ],
			[ 'F1', 43.654, 29 ],
			[ 'F♯/G♭1', 46.249, 30 ],
			[ 'G1', 48.999, 31 ],
			[ 'A♭/G♯1', 51.913, 32 ],
			[ 'A1', 55.000, 33 ],
			[ 'B♭/A♯1', 58.270, 34 ],
			[ 'B1', 61.735, 35 ],

			// Octave 2
			[ 'C2', 65.406, 36 ],
			[ 'C♯/D♭2', 69.296, 37 ],
			[ 'D2', 73.416, 38 ],
			[ 'E♭/D♯2', 77.782, 39 ],
			[ 'E2', 82.407, 40 ],
			[ 'F2', 87.307, 41 ],
			[ 'F♯/G♭2', 92.499, 42 ],
			[ 'G2', 97.999, 43 ],
			[ 'A♭/G♯2', 103.83, 44 ],
			[ 'A2', 110.00, 45 ],
			[ 'B♭/A♯2', 116.54, 46 ],
			[ 'B2', 123.47, 47 ],

			// Octave 3
			[ 'C3', 130.81, 48 ],
			[ 'C♯/D♭3', 138.59, 49 ],
			[ 'D3', 146.83, 50 ],
			[ 'E♭/D♯3', 155.56, 51 ],
			[ 'E3', 164.81, 52 ],
			[ 'F3', 174.61, 53 ],
			[ 'F♯/G♭3', 185.00, 54 ],
			[ 'G3', 196.00, 55 ],
			[ 'A♭/G♯3', 207.65, 56 ],
			[ 'A3', 220.00, 57 ],
			[ 'B♭/A♯3', 233.08, 58 ],
			[ 'B3', 246.94, 59 ],

			// Octave 4
			[ 'C4', 261.63, 60 ],
			[ 'C♯/D♭4', 277.18, 61 ],
			[ 'D4', 293.66, 62 ],
			[ 'E♭/D♯4', 311.13, 63 ],
			[ 'E4', 329.63, 64 ],
			[ 'F4', 349.23, 65 ],
			[ 'F♯/G♭4', 369.99, 66 ],
			[ 'G4', 392.00, 67 ],
			[ 'A♭/G♯4', 415.30, 68 ],
			[ 'A4', 440.00, 69 ],
			[ 'B♭/A♯4', 466.16, 70 ],
			[ 'B4', 493.88, 71 ],

			// Octave 5
			[ 'C5', 523.25, 72 ],
			[ 'C♯/D♭5', 554.37, 73 ],
			[ 'D5', 587.33, 74 ],
			[ 'E♭/D♯5', 622.25, 75 ],
			[ 'E5', 659.26, 76 ],
			[ 'F5', 698.46, 77 ],
			[ 'F♯/G♭5', 739.99, 78 ],
			[ 'G5', 783.99, 79 ],
			[ 'A♭/G♯5', 830.61, 80 ],
			[ 'A5', 880.00, 81 ],
			[ 'B♭/A♯5', 932.33, 82 ],
			[ 'B5', 987.77, 83 ],

			// Octave 6
			[ 'C6', 1046.5, 84 ],
			[ 'C♯/D♭6', 1108.7, 85 ],
			[ 'D6', 1174.7, 86 ],
			[ 'E♭/D♯6', 1244.5, 87 ],
			[ 'E6', 1318.5, 88 ],
			[ 'F6', 1396.9, 89 ],
			[ 'F♯/G♭6', 1480.0, 90 ],
			[ 'G6', 1568.0, 91 ],
			[ 'A♭/G♯6', 1661.2, 92 ],
			[ 'A6', 1760.0, 93 ],
			[ 'B♭/A♯6', 1864.7, 94 ],
			[ 'B6', 1975.5, 95 ],

			// Octave 7
			[ 'C7', 2093.0, 96 ],
			[ 'C♯/D♭7', 2217.5, 97 ],
			[ 'D7', 2349.3, 98 ],
			[ 'E♭/D♯7', 2489.0, 99 ],
			[ 'E7', 2637.0, 100 ],
			[ 'F7', 2793.8, 101 ],
			[ 'F♯/G♭7', 2960.0, 102 ],
			[ 'G7', 3136.0, 103 ],
			[ 'A♭/G♯7', 3322.4, 104 ],
			[ 'A7', 3520.0, 105 ],
			[ 'B♭/A♯7', 3729.3, 106 ],
			[ 'B7', 3951.1, 107 ],

			// Octave 8
			[ 'C8', 4186.0, 108 ],
			[ 'C♯/D♭8', 4434.9, 109 ],
			[ 'D8', 4698.6, 110 ],
			[ 'E♭/D♯8', 4978.0, 111 ],
			[ 'E8', 5274.0, 112 ],
			[ 'F8', 5587.7, 113 ],
			[ 'F♯/G♭8', 5919.9, 114 ],
			[ 'G8', 6271.9, 115 ],
			[ 'A♭/G♯8', 6644.9, 116 ],
			[ 'A8', 7040.0, 117 ],
			[ 'B♭/A♯8', 7458.6, 118 ],
			[ 'B8', 7902.1, 119 ],

			// Octave 9
			[ 'C9', 8372.0, 120 ],
			[ 'C♯/D♭9', 8869.8, 121 ],
			[ 'D9', 9397.3, 122 ],
			[ 'E♭/D♯9', 9956.1, 123 ],
			[ 'E9', 10548.1, 124 ],
			[ 'F9', 11175.3, 125 ],
			[ 'F♯/G♭9', 11839.8, 126 ],
			[ 'G9', 12543.9, 127 ]
		];

		const every = notes.every( ([a,frequency,note], index) =>
		{
			// Reference table uses oddly rounded decimals, we have to round both numbers to their first decimal.
			const reference = Math.round((frequency as number)*10)/10;

			const n = ToneHelper.noteToFrequency(note as number);
			const rounded = Math.round(n*10)/10;

			return note === index && reference.toString() === rounded.toString();
		});

		expect( every ).toBe(true);
	} );

} );
