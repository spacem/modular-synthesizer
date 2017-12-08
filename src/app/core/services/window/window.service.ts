import { Injectable } from '@angular/core';

/**
 * Private access point to window.
 *
 * @returns {Window}
 */
function getWindow():Window
{
	return window;
}

/**
 * Offers an injectable and unit-testable access point to the browser native window object.
 */
@Injectable()
export class WindowService
{
	private window:Window = getWindow();

	/**
	 * @param {Window} window
	 * 	Convenient method to inject and use another window object than the browser native window into the application.
	 */
	constructor( window:Window )
	{
		this.window = window || getWindow();
	}

	/**
	 * Return teh reference to the window object to use into the application.
	 *
	 * @param {string} propertyName
	 * 	The property name to check it exists.
	 *
	 * @returns {boolean}
	 */
	public getWindow( propertyName:string ):Window
	{
		return this.window;
	}

	/**
	 * Check for the existence of a particular window property
	 * (some could need special check in the future).
	 *
	 * @param {string} propertyName
	 * 	The property name to check it exists.
	 *
	 * @returns {boolean}
	 */
	public has( propertyName:string ):boolean
	{
		return propertyName in this.window;
	}
}