import { Injectable } from '@angular/core';

@Injectable()
export class MathHelper
{
	/**
	 * Return the value corresponding to a percentage on a range of two values.
	 *
	 * @param {number} percent
	 * 	The percent input value.
	 *
	 * @param {number} from
	 * 	The "from" boundary of the range (can be greater than the "to" boundary value).
	 *
	 * @param {number} to
	 *  The "to" boundary of the range (can be lower than the "from" boundary value).
	 *
	 * @returns {number}
	 * 	The value corresponding to the percentage on the given range.
	 */
	static percentToRange( percent:number, from:number, to:number ):number
	{
		if( from > to )
			[to, from] = [from, to];

		return percent*(to - from)/100 + from;
	}

	// @see https://stackoverflow.com/questions/846221/logarithmic-slider
	public static logarithmicScale
	(
		value:number,
		minFrom:number, maxFrom:number,
		minTo:number, maxTo:number
	):number
	{
		const minLog = Math.log(minTo+.00000000000000000001);
		const maxLog = Math.log(maxTo+.00000000000000000001);

		// Calculate adjustment factor
		const scale = (maxLog-minLog) / (maxFrom-minFrom);

		return Math.exp(minLog + scale*(value-minFrom));
	}
}