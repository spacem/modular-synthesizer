import {Component, Host, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MainPanelComponent} from '../../main-panel/main-panel.component';
import {Note} from '../../../models/note';

// We don't really need a Key object model, so let's use a minimal interface instead.
interface Key {
	note:Note;
	number:number;
}

/**
* User Interface component for the musical keyboard component.
*
* @see https://en.wikipedia.org/wiki/Piano_key_frequencies
* @see https://en.wikipedia.org/wiki/Accidental_(music)
*/
@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit, OnChanges
{
	static readonly MIN_KEY = -12;
	static readonly MAX_KEY = 220;

	static readonly DEFAULT_MIN_KEY = -12;
	static readonly DEFAULT_MAX_KEY = 220;

	_minKey:number = 36;
	_maxKey:number = 60;

	/**
	 * Lower left key on the keyboard (default is C3 with 36).
	 */
	@Input()
	public get minKey():number{ return this._minKey; }
	public set minKey( value:number )
	{
		value = Math.floor(value);

		if( !isNaN(value) )
			this._minKey = value;
	}

	/**
	 * Upper right key on the keyboard (default is C4 with 60).
	 */
	@Input()
	public get maxKey():number{ return this._maxKey; }
	public set maxKey( value:number )
	{
		value = Math.floor(value);

		if( !isNaN(value) )
			this._maxKey = value;
	}

	/**
	 * Displayed list of the keys on the keyboard.
	 */
	public keys:Key[];

	constructor(@Host() private panel:MainPanelComponent){}

	ngOnInit()
	{
		console.log(this.minKey,this.maxKey);
	}

	ngOnChanges( changes:SimpleChanges )
	{
		if( changes.minKey )
			this.minKey = changes.minKey.currentValue;

		if( changes.maxKey )
			this.maxKey = changes.maxKey.currentValue;

		this.keys = this.generateKeys(this.minKey,this.maxKey);
	}

	playNote(frequency:number)
	{
		console.log(frequency);
		this.panel.setTone(frequency);
	}

	/**
	 * Generate the keyboard layout using current min and max key with C0 as the reference zero key (A4 being key 57).
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
	public generateKeys( minKey:number, maxKey:number ):Key[]
	{
		const keys:Key[] = [];
		for( let i=minKey; i<=maxKey; i++ )
		{
			const octave = Math.floor(i/12);

			// @see https://stackoverflow.com/questions/18618136/how-to-calculate-modulo-of-negative-integers-in-javascript
			const noteNumberInOctave = (i%12+12)%12;

			keys.push({note:new Note(octave,noteNumberInOctave), number:i});
		}

		console.log(minKey,maxKey,keys);

		return keys;
	}
}
