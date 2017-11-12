import {Component, Host, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MainPanelComponent} from '../../main-panel/main-panel.component';
import {Note} from '../../../models/note';
import {Key} from '../../../models/key';

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
	/**
	 * Corresponding to key C-1 at near 8Hz.
	 */
	static readonly MIN_KEY_LOWER_LIMIT:number = -12;

	/**
	 * Corresponding to key C10 at near 16744Hz.
	 */
	static readonly MAX_KEY_UPPER_LIMIT:number = 120;

	protected _octave:number = Math.floor(KeyboardComponent.MIN_KEY_LOWER_LIMIT/12);
	protected _octaves:number = Math.floor(KeyboardComponent.MAX_KEY_UPPER_LIMIT/12) - Math.floor(KeyboardComponent.MIN_KEY_LOWER_LIMIT/12);
	protected _minKey:number = KeyboardComponent.MIN_KEY_LOWER_LIMIT;
	protected _maxKey:number = KeyboardComponent.MAX_KEY_UPPER_LIMIT;
	protected _keys:Key[] = [];

	/**
	 * Generate the keyboard layout using current min and max key with C0 as the reference zero key (A4 being key 57).
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
		if( isNaN(minKey) || isNaN(maxKey) || minKey>maxKey )
			throw(Error(`Key range error: ${minKey} => ${maxKey}`));

		const keys:Key[] = [];
		for( let i=minKey; i<=maxKey; i++ )
			keys.push(KeyboardComponent.createKey(i));

		return keys;
	}

	/**
	 * Generate a single key using its key number with C0 as the reference zero key.
	 *
	 * @param {number} keyNumber
	 * 	Key number for the key to create with C0 as the reference zero key.
	 *
	 * @return {Key}
	 * 	The newly created key.
	 */
	public static createKey( keyNumber:number ):Key
	{
		if( isNaN(keyNumber) )
			throw(Error(`Key range error: ${keyNumber}`));

		const octave = Math.floor(keyNumber/12);

		// @see https://stackoverflow.com/questions/18618136/how-to-calculate-modulo-of-negative-integers-in-javascript
		const noteNumberInOctave = (keyNumber%12+12)%12;

		const note:Note = new Note(octave,noteNumberInOctave);
		return new Key(note,keyNumber);
	}

	/**
	 * Displayed list of the keys on the keyboard.
	 */
	public get keys():Key[]
	{
		return this._keys;
	}

	/**
	 * The base octave used to set the first C key on the left of keyboard.
	 */
	@Input()
	public get octave():number{ return this._octave; }
	public set octave( value:number )
	{
		console.log(value);

		if( !isNaN(value) )
			this._octave = value;
	}

	/**
	 * The number of octaves displayed by the keyboard.
	 */
	@Input()
	public get octaves():number{ return this._octaves; }
	public set octaves( value:number )
	{
		console.log(value);

		if( !isNaN(value) )
			this._octaves = value;
	}

	/**
	 * Lower left key on the keyboard.
	 */
	@Input()
	public get minKey():number{ return this._minKey; }
	public set minKey( value:number )
	{
		console.log(value);

		value = Math.max(KeyboardComponent.MIN_KEY_LOWER_LIMIT, Math.min(Math.floor(value),KeyboardComponent.MAX_KEY_UPPER_LIMIT));

		if( !isNaN(value) )
			this._minKey = value;
	}

	/**
	 * Upper right key on the keyboard.
	 */
	@Input()
	public get maxKey():number{ return this._maxKey; }
	public set maxKey( value:number )
	{
		console.log(value);

		value = Math.max(KeyboardComponent.MIN_KEY_LOWER_LIMIT, Math.min(Math.floor(value),KeyboardComponent.MAX_KEY_UPPER_LIMIT));

		if( !isNaN(value) )
			this._maxKey = value;
	}

	constructor(@Host() private panel:MainPanelComponent){}

	ngOnInit(){}

	ngOnChanges( changes:SimpleChanges )
	{
		let	minKey:number, maxKey:number;

		if( changes.octave )
			this.octave = changes.octave.currentValue;

		if( changes.octaves )
			this.octaves = changes.octaves.currentValue;

		if( changes.minKey )
			this.minKey = changes.minKey.currentValue;

		if( changes.maxKey )
			this.maxKey = changes.maxKey.currentValue;

		if( changes.octave || changes.octaves )
		{
			minKey = this.octave*12 ;
			maxKey = minKey + this.octaves*12;
		}
		else
		if( changes.minKey || changes.maxKey )
		{
			// To reduce key range errors, maxKey can't be lower than minKey value.
			maxKey = Math.max(this._minKey,this._maxKey);
			minKey = this._minKey;
		}

		this._keys = KeyboardComponent.generateKeys(minKey,maxKey);

		console.log(this._minKey,this._maxKey,this._keys);
	}

	/**
	 * Process the given key as pressed.
	 *
	 * @param {Key} key
	 * 	The key to mark as pressed.
	 */
	keyDown( key:Key )
	{
		console.log(key.note.frequency);
		this.playNote(key.note.frequency);
	}

	/**
	 * Process the given key as released.
	 *
	 * @param {Key} key
	 * 	The key to mark as pressed.
	 */
	keyUp( key:Key )
	{
		this.playNote(0);
	}

	//TODO Will be removed when implementing connexion between components.
	playNote( frequency:number )
	{
		this.panel.setTone(frequency);
	}
}
