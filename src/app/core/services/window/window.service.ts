import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as lodash from 'lodash-es';

/**
 * Offers an injectable and unit-testable unique access point to the browser window object.
 */
@Injectable()
export class WindowService
{
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
		// We have to cast 'parentWindow' to 'Window' because as of today 11/10/2017 'parentWindow' is not declared in
		// lib.es6.d.ts ECMAScript APIs TypeScript definition.
		const window:Window = (this.document['parentWindow'] as Window) || this.document.defaultView;

		if( !window )
			throw Error(`Can't access the application container window.`);

		return window;
	}

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Check for the existence of a particular window property
	 *
	 * It doesn't use lodash.has, because some window property are not enumerable, so we have to retrieve it first to
	 * test for their existence.
	 *
	 * @param path
	 * 	The property path name to check it exists.
	 *
	 * 	e.g: 'navigator.languages.length'
	 *
	 * @returns
	 * 	The property exists on window or not.
	 */
	public has<K extends keyof Window>( path:K ):boolean
	{
		return typeof lodash.get( this.getWindow(), path ) !== 'undefined';
	}

	/**
	 * Return the requested window property.
	 *
	 * @param path
	 * 	The requested property path to get.
	 *
	 * 	e.g: 'navigator.languages.length'
	 *
	 * @param defaultValue
	 * 	The value to return when the searched property doesn't exist onto window.
	 *
	 * @returns
	 * 	The requested property value on Window.
	 */
	public get<K extends keyof Window>( path:K, defaultValue?:Window[K] ):Window[K]
	{
		return lodash.get( this.getWindow(), path, defaultValue);
	}
}