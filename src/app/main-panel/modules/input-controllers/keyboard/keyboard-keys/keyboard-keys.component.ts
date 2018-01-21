import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Note } from '../../../../../shared/models/note/note';

/**
* User Interface component for the musical keyboard component.
*
* @see https://en.wikipedia.org/wiki/Piano_key_frequencies
* @see https://en.wikipedia.org/wiki/Accidental_(music)
*/
@Component({
	selector: 'app-keyboard-keys',
	templateUrl: './keyboard-keys.component.html',
	styleUrls: ['./keyboard-keys.component.scss']
})
export class KeyboardKeysComponent implements OnChanges
{
	/**
	 * The very lower key the keyboard will ever display: zero being key C-1 at near 8Hz.
	 */
	static readonly LOWER_KEY_LIMIT:number = 0;

	/**
	 * The very upper key the keyboard will ever display: 127 being key C10 at near 16744Hz.
	 */
	static readonly UPPER_KEY_LIMIT:number = 127;

	protected _octave:number = Math.floor(KeyboardKeysComponent.LOWER_KEY_LIMIT/12)-1;
	protected _octaves:number = Math.floor(KeyboardKeysComponent.UPPER_KEY_LIMIT/12) - Math.floor(KeyboardKeysComponent.LOWER_KEY_LIMIT/12);
	protected _lowerKey:number = KeyboardKeysComponent.LOWER_KEY_LIMIT;
	protected _upperKey:number = KeyboardKeysComponent.UPPER_KEY_LIMIT;
	protected _notes:Note[] = [];

	public mouseDown:boolean = false;

	@Output() keyDown = new EventEmitter<Note>();
	@Output() keyUp = new EventEmitter<Note>();

	/**
	 * Generate the keyboard layout using current min and max key with C-1 as the reference zero key (A4 being key 69).
	 *
	 * @param {number} lowerKey
	 * 	Lower key on the keyboard layout.
	 *
	 * @param {number} upperKey
	 * 	Upper key on the keyboard layout.
	 *
	 * @return {Key[]}
	 * 	The generated keyboard layout.
	 */
	public static generateKeys( lowerKey:number, upperKey:number ):Note[]
	{
		if( isNaN(lowerKey) || isNaN(upperKey) || lowerKey>upperKey )
			throw(Error(`Key range error: ${lowerKey} => ${upperKey}`));

		const keys:Note[] = [];
		for( let i=lowerKey; i<=upperKey; i++ )
			keys.push(KeyboardKeysComponent.createKey(i));

		return keys;
	}

	/**
	 * Generate a single key using its key number with C-1 as the reference zero key.
	 *
	 * @param {number} keyNumber
	 * 	Key number for the key to create with C-1 as the reference zero key.
	 *
	 * @return {Key}
	 * 	The newly created key.
	 */
	public static createKey( keyNumber:number ):Note
	{
		if( isNaN(keyNumber) )
			throw(Error(`Key range error: ${keyNumber}`));

		return new Note(keyNumber);
	}


	/**
	 * Displayed list of the keys on the keyboard.
	 */
	public get notes():Note[]
	{
		return this._notes;
	}

	/**
	 * The base octave used to set the first C key on the left of keyboard.
	 */
	@Input()
	public get octave():number{ return this._octave; }
	public set octave( value:number )
	{
		//console.log(value);

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
		//console.log(value);

		if( !isNaN(value) )
			this._octaves = value;
	}

	/**
	 * Lower left key on the keyboard.
	 */
	@Input()
	public get lowerKey():number{ return this._lowerKey; }
	public set lowerKey(value:number )
	{
		//console.log(value);

		value = Math.max(KeyboardKeysComponent.LOWER_KEY_LIMIT, Math.min(Math.floor(value),KeyboardKeysComponent.UPPER_KEY_LIMIT));

		if( !isNaN(value) )
			this._lowerKey = value;
	}

	/**
	 * Upper right key on the keyboard.
	 */
	@Input()
	public get upperKey():number{ return this._upperKey; }
	public set upperKey( value:number )
	{
		//console.log(value);

		value = Math.max(KeyboardKeysComponent.LOWER_KEY_LIMIT, Math.min(Math.floor(value),KeyboardKeysComponent.UPPER_KEY_LIMIT));

		if( !isNaN(value) )
			this._upperKey = value;
	}

	ngOnChanges( changes:SimpleChanges )
	{
		let	lowerKey:number, upperKey:number;

		if( changes.octave )
			this.octave = +changes.octave.currentValue;

		if( changes.octaves )
			this.octaves = +changes.octaves.currentValue;

		if( changes.lowerKey )
			this.lowerKey = +changes.lowerKey.currentValue;

		if( changes.upperKey )
			this.upperKey = +changes.upperKey.currentValue;

		if( changes.octave || changes.octaves )
		{
			lowerKey = (this.octave+1)*12;
			upperKey = lowerKey + this.octaves*12;
		}
		else
		if( changes.lowerKey || changes.upperKey )
		{
			// To reduce key range errors, upperKey can't be lower than lowerKey value.
			upperKey = Math.max(this._lowerKey,this._upperKey);
			lowerKey = this._lowerKey;
			this.octave = Math.floor(lowerKey/12)-1;
		}

		this._notes = KeyboardKeysComponent.generateKeys(lowerKey,upperKey);

		console.log(this._lowerKey,this._upperKey,this._notes);
	}

	/**
	 * Process the given key as pressed.
	 *
	 * @param {Note} note
	 * 	The key corresponding to the note to mark as on.
	 */
	public onKeyDown( note:Note )
	{
		console.log(note.frequency);
		note.on = true;
		note.velocity = 127;
		this.keyDown.emit(note);
	}

	// noinspection JSUnusedLocalSymbols
	/**
	 * Process the given key as released.
	 *
	 * @param {Note} note
	 * 	The key corresponding to the note to mark as off.
	 */
	public onKeyUp( note:Note )
	{
		note.on = false;
		note.velocity = 0;
		this.keyUp.emit(note);
	}
}
