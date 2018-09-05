import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EasingHelper
{
	/**
	 * Complete list of the available equation names, strictly respecting the name of the corresponding class method.
	 *
	 * @type {(keyof EasingHelper)[]}
	 */
	public static readonly easings:(keyof EasingHelper)[] =
	[
		'linearEase',
		'easeInQuad',
		'easeOutQuad',
		'easeInOutQuad',
		'easeInCubic',
		'easeOutCubic',
		'easeInOutCubic',
		'easeInQuart',
		'easeOutQuart',
		'easeInOutQuart',
		'easeInQuint',
		'easeOutQuint',
		'easeInOutQuint',
		'easeInSine',
		'easeOutSine',
		'easeInOutSine',
		'easeInExpo',
		'easeOutExpo',
		'easeInOutExpo',
		'easeInCirc',
		'easeOutCirc',
		'easeInOutCirc',
		'easeInElastic',
		'easeOutElastic',
		'easeInOutElastic',
		'easeInBack',
		'easeOutBack',
		'easeInOutBack',
		'easeInBounce',
		'easeOutBounce',
		'easeInOutBounce'
	];

	/**
	 * Entry method to access all the equation by their string names.
	 *
	 * @param {string} name
	 * 	The name of the easing equation to use.
	 *
	 * @param {number} current
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} from
	 * 	Beginning value of the property.
	 *
	 * @param {number} change
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} duration
	 * 	Total time of the neonate.
	 *
	 * @param {number} overshoot
	 * 	 Controls overshoot, the default producing a 10% overshoot.
	 */
	public ease<T extends keyof EasingHelper>( name:T, current:number, from:number, change:number, duration:number, overshoot:number = 1.70158 ):number
	{
		// TypeScript does not allow to filter out the 'ease' method from 'keyof EasingHelper' for today.
		// @see https://github.com/Microsoft/TypeScript/issues/13214
		if( name === 'ease' || typeof this[name] !== 'function' )
		{
			console.warn(`"${name}" is not a valid easing equation name, will use "easeNone" instead`);
			name = <T> 'easeNone';
		}

		//FIXME Remove type any
		return (this[name] as any)(current,from,change,duration,overshoot);
	}

	/**
	 * Easing equation for a calculation with no easing at all.
	 *
	 * @param {number} t  (not use there but kept to allow "parametric polymorphism" with the others methods).
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d (not use there but kept to allow "parametric polymorphism" with the others methods).
	 * 	Total time of the neonate.
 	 */
	public easeNone( t:number, b:number, c:number, d:number ):number
	{
		return b+c;
	}

	/**
	 * Easing equation for a simple linear calculation with no easing.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public linearEase( t:number, b:number, c:number, d:number ):number
	{
		return c * t / d + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Quadratic

	/**
	 * Easing equation for a quadratic (t^2) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInQuad( t:number, b:number, c:number, d:number ):number
	{
		return c * (t /= d) * t + b;
	}

	/**
	 * Easing equation for a quadratic (t^2) ease-out, decelerating to zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutQuad( t:number, b:number, c:number, d:number ):number
	{
		return -c * (t /= d) * (t - 2) + b;
	}

	/**
	 * Easing equation for a quadratic (t^2) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutQuad( t:number, b:number, c:number, d:number ):number
	{
		if ( (t /= d / 2) < 1 )
			return c / 2 * t * t + b;

		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Cubic

	/**
	 * Easing equation function for a cubic (t^3) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInCubic( t:number, b:number, c:number, d:number ):number
	{
		return c * (t /= d) * t * t + b;
	}

	/**
	 * Easing equation for a cubic (t^3) ease-out, decelerating to zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutCubic( t:number, b:number, c:number, d:number ):number
	{
		return c * ((t = t / d - 1) * t * t + 1) + b;
	}

	/**
	 * Easing equation for a cubic (t^3) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutCubic( t:number, b:number, c:number, d:number ):number
	{
		if ( (t /= d / 2) < 1 )
			return c / 2 * t * t * t + b;

		return c / 2 * ((t -= 2) * t * t + 2) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Quartic

	/**
	 * Easing equation for a quartic (t^4) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInQuart( t:number, b:number, c:number, d:number ):number
	{
		return c * (t /= d) * t * t * t + b;
	}

	/**
	 * Easing equation for a quartic (t^4) ease-out, decelerating to zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutQuart( t:number, b:number, c:number, d:number ):number
	{
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	}

	/**
	 * Easing equation for a quartic (t^4) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutQuart( t:number, b:number, c:number, d:number ):number
	{
		if ( (t /= d / 2) < 1 )
			return c / 2 * t * t * t * t + b;

		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Quintic

	/**
	 * Easing equation function for a quintic (t^5) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInQuint( t:number, b:number, c:number, d:number ):number
	{
		return c * (t /= d) * t * t * t * t + b;
	}

	/**
	 * Easing equation function for a quintic (t^5) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutQuint( t:number, b:number, c:number, d:number ):number
	{
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	}

	/**
	 * Easing equation for a quintic (t^5) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutQuint( t:number, b:number, c:number, d:number ):number
	{
		if ( (t /= d / 2) < 1 )
			return c / 2 * t * t * t * t * t + b;

		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Sine

	/**
	 * Easing equation for a sinusoidal (sin(t)) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInSine( t:number, b:number, c:number, d:number ):number
	{
		return -c * Math.cos( t / d * (Math.PI / 2) ) + c + b;
	}

	/**
	 * Easing equation for a sinusoidal (sin(t)) ease-out, decelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutSine( t:number, b:number, c:number, d:number ):number
	{
		return c * Math.sin( t / d * (Math.PI / 2) ) + b;
	}

	/**
	 * Easing equation for a sinusoidal (sin(t)) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutSine( t:number, b:number, c:number, d:number ):number
	{
		return -c / 2 * (Math.cos( Math.PI * t / d ) - 1) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Exponential

	/**
	 * Easing equation for an exponential (2^t) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInExpo( t:number, b:number, c:number, d:number ):number
	{
		return (t === 0) ? b : c * Math.pow( 2, 10 * (t / d - 1) ) + b;
	}

	/**
	 * Easing equation for an exponential (2^t) ease-out, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutExpo( t:number, b:number, c:number, d:number ):number
	{
		return (t === d) ? b + c : c * (-Math.pow( 2, -10 * t / d ) + 1) + b;
	}

	/**
	 * Easing equation for an exponential (2^t) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutExpo( t:number, b:number, c:number, d:number ):number
	{
		if ( t === 0 )
			return b;

		if ( t === d )
			return b + c;

		if ( (t /= d / 2) < 1 )
			return c / 2 * Math.pow( 2, 10 * (t - 1) ) + b;

		return c / 2 * (-Math.pow( 2, -10 * --t ) + 2) + b;
	}



	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Circular

	/**
	 * Easing equation for a circular (sqrt(1-t^2)) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInCirc( t:number, b:number, c:number, d:number ):number
	{
		return -c * (Math.sqrt( 1 - (t /= d) * t ) - 1) + b;
	}

	/**
	 * Easing equation for a circular (sqrt(1-t^2)) ease-out, decelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutCirc( t:number, b:number, c:number, d:number ):number
	{
		return c * Math.sqrt( 1 - (t = t / d - 1) * t ) + b;
	}

	/**
	 * Easing equation for a circular (sqrt(1-t^2)) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutCirc( t:number, b:number, c:number, d:number ):number
	{
		if ( (t /= d / 2) < 1 )
			return -c / 2 * (Math.sqrt( 1 - t * t ) - 1) + b;

		return c / 2 * (Math.sqrt( 1 - (t -= 2) * t ) + 1) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Elastic

	/**
	 * Easing equation for an elastic (exponentially decaying sine wave) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInElastic( t:number, b:number, c:number, d:number ):number
	{
		let s:number = 1.70158;
		const p:number = d * 0.3;
		let a:number = c;

		if ( t === 0 )
			return b;

		if ( (t /= d) === 1 )
			return b + c;

		if ( a < Math.abs( c ) )
		{
			a = c;
			s = p / 4;
		}
		else
		{
			s = p / (2 * Math.PI) * Math.asin( c / a );
		}

		return -(a * Math.pow( 2, 10 * (t--) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;
	}

	/**
	 * Easing equation for an elastic (exponentially decaying sine wave) ease-out, decelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutElastic( t:number, b:number, c:number, d:number ):number
	{
		let s:number = 1.70158;
		const p:number = d * 0.3;
		let a:number = c;

		if ( t === 0 )
			return b;

		if ( (t /= d) === 1 )
			return b + c;

		if ( a < Math.abs( c ) )
		{
			a = c;
			s = p / 4;
		}
		else
		{
			s = p / (2 * Math.PI) * Math.asin( c / a );
		}

		return a * Math.pow( 2, -10 * t ) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) + c + b;
	}

	/**
	 * Easing equation for an elastic (exponentially decaying sine wave) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutElastic( t:number, b:number, c:number, d:number ):number
	{
		let s:number = 1.70158;
		const p:number = d * (0.3 * 1.5);
		let a:number = c;

		if ( t === 0 )
			return b;

		if ( (t /= d / 2) === 2 )
			return b + c;

		if ( a < Math.abs( c ) )
		{
			a = c;
			s = p / 4;
		}
		else
		{
			s = p / (2 * Math.PI) * Math.asin( c / a );
		}

		if ( t < 1 )
			return -0.5 * (a * Math.pow( 2, 10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p )) + b;

		return a * Math.pow( 2, -10 * (t -= 1) ) * Math.sin( (t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Back

	/**
	 * Easing equation for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 *
	 * @param {number} s
	 * 	Controls overshoot, the default producing a 10% overshoot.
	 */
	public easeInBack( t:number, b:number, c:number, d:number, s:number=1.70158 ):number
	{
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	}

	/**
	 * Easing equation for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) ease-out, decelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 *
	 * @param {number} s
	 * 	Controls overshoot, the default producing a 10% overshoot.
	 */
	public easeOutBack( t:number, b:number, c:number, d:number, s:number=1.70158 ):number
	{
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	}

	/**
	 * Easing equation for a back (overshooting cubic easing: (s+1)*t^3 - s*t^2) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 *
	 * @param {number} s
	 * 	Controls overshoot, the default producing a 10% overshoot.
	 */
	public easeInOutBack( t:number, b:number, c:number, d:number, s:number=1.70158 ):number
	{
		if ( (t /= d / 2) < 1 )
			return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;

		return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	}



	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Bounce

	/**
	 * Easing equation for a bounce (exponentially decaying parabolic bounce) ease-in, accelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInBounce( t:number, b:number, c:number, d:number ):number
	{
		return c - this.easeOutBounce( d - t, 0, c, d ) + b;
	}

	/**
	 * Easing equation for a bounce (exponentially decaying parabolic bounce) ease-out, decelerating from zero velocity.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeOutBounce( t:number, b:number, c:number, d:number ):number
	{
		if ( (t /= d) < (1 / 2.75) )
			return c * (7.5625 * t * t) + b;

		else if ( t < (2 / 2.75) )
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;

		else if ( t < (2.5 / 2.75) )
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;

		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	}

	/**
	 * Easing equation for a bounce (exponentially decaying parabolic bounce) ease-in/out, accelerating until halfway, then decelerating.
	 *
	 * @param {number} t
	 * 	Current time (or position) of the neonate. This can be seconds or frames, steps seconds, ms, whatever – as long as the unit is the
	 * 	same as is used for the total time.
	 *
	 * @param {number} b
	 * 	Beginning value of the property.
	 *
	 * @param {number} c
	 * 	Change between the beginning and destination value of the property.
	 *
	 * @param {number} d
	 * 	Total time of the neonate.
	 */
	public easeInOutBounce( t:number, b:number, c:number, d:number ):number
	{
		if ( t < d / 2 )
			return this.easeInBounce( t * 2, 0, c, d ) * 0.5 + b;

		return this.easeOutBounce( t * 2 - d, 0, c, d ) * 0.5 + c * 0.5 + b;
	}
}

//@see https://github.com/cinder/Cinder/blob/master/include/cinder/Easing.h

/**
 * TERMS OF USE - EASING EQUATIONS
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions
 * and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions
 * and the following disclaimer in the documentation and/or other materials provided with the
 * distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse or promote
 * products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
