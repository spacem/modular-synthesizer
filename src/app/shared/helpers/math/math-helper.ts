export class MathHelper
{
	/**
	 * Return the value in a range corresponding to a percentage on this range.
	 *
	 * @param {number} percent
	 * 	The percent input value.
	 *
	 * @param {number} bound1
	 * 	The first boundary of the range (can be greater than the second boundary value).
	 *
	 * @param {number} bound2
	 *  The second boundary of the range (can be lower than the first boundary value).
	 *
	 * @returns {number}
	 * The value in the range corresponding to the percent input value
	 */
	static percentToRange( percent:number, bound1:number, bound2:number ):number
	{
		if( bound1 > bound2 )
			[bound2, bound1] = [bound1, bound2];

		return percent*(bound2 - bound1)/100 + bound1;
	}
}