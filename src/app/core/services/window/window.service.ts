import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

/**
 * Offers an injectable and unit-testable unique access point to the browser window object.
 */
@Injectable()
export class WindowService
{
	private window:Window;

	/**
	 * Build the WindowService class.
	 *
	 * @param document
	 * 	Convenient method to inject another window object than the browser native window into the application or tests.
	 */
	constructor( @Inject(DOCUMENT) private document:Document ){}

	/**
	 * Return the reference to the browser native window object.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/defaultView
	 * @see https://github.com/maxisam/ngx-window-token
	 * @see https://stackoverflow.com/questions/1338224/how-do-i-get-the-window-object-from-the-document-object
	 *
	 * @returns
	 * 	The reference to the browser native window object.
	 */
	public getWindow():Window
	{
		const window:Window = this.window || (this.document['parentWindow'] as Window) || this.document.defaultView;

		if( !window )
			throw Error(`Can't access the application container window.`);

		return window;
	}

	/**
	 * Check for the existence of a particular window property
	 * (some could need special check in the future).
	 *
	 * @param propertyName
	 * 	The property name to check it exists.
	 *
	 * @returns
	 * 	The property exists on window or not.
	 */
	public has<K extends keyof Window>( propertyName:K ):boolean
	{
		return propertyName in this.getWindow();
	}

	/**
	 * Return the requested window property.
	 *
	 * @param propertyName
	 * 	The requested property name.
	 *
	 * @param defaultValue
	 * 	The value to return when the searched property doesn't exist onto window.
	 *
	 * @returns
	 * 	Requested property value on Window.
	 */
	public get<K extends keyof Window>( propertyName:K, defaultValue?:Window[K] ):Window[K]
	{
		return !this.has(propertyName) ? defaultValue : this.getWindow()[propertyName];
	}
}