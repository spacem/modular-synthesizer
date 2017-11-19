import {Note} from './note';

/**
 * Model for each of the keyboard key.
 */
export class Key
{
	note:Note;
	number:number;

	constructor(note:Note, number:number)
	{
		this.note = note;
		this.number = number;
	}
}