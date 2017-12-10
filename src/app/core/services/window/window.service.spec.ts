import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';
import { DOCUMENT } from '@angular/common';

describe( 'WindowService', () =>
{
	const documentMock:Document =
	{
		defaultView:
		{
			name: 'mockedWindowName',
			navigator:
			{
				languages:
				{
					length: 4
				}
			}
		}
	} as Document;

	beforeEach( () =>
	{
		TestBed.configureTestingModule( {
			providers: [WindowService, { provide:DOCUMENT, useValue: documentMock } ]
		} );
	} );

	it( 'should be created', () =>
	{
		const service = TestBed.get( WindowService );
		expect( service ).toBeTruthy();
	} );

	it( '::getWindow() should return the injected documentMock.defaultView', () =>
	{
		const service = TestBed.get( WindowService );
		debugger;
		expect( service.getWindow() ).toBe( documentMock.defaultView );
	} );

	it( '::getWindow() should return the real browser window when it exists', () =>
	{
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(document) });

		const service = TestBed.get( WindowService );
		expect( service.getWindow() ).toBe( window );
	} );

	it( `::has() should return true when window has the requested property`, () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.has( 'name' ) ).toBe( true );
	} );

	it( `::has() should return false when window does not have the requested property`, () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.has( 'console' ) ).toBe( false );
	} );

	it( `::has() should return true when window has the requested property using a path`, () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.has( 'navigator.languages.length' ) ).toBe( true );
	} );

	it( `::has() should return false when window does not have the requested property using a path`, () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.has( 'navigator.userAgent.length' ) ).toBe( false );
	} );

	it( '::get() should return the requested property value on the browser window', () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.get( 'name' ) ).toBe( 'mockedWindowName' );
	} );

	it( '::get() should return the requested property value on the browser window using a path', () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.get( 'navigator.languages.length' ) ).toBe( 4 );
	} );

	it( `::get() should return undefined when the requested property value doesn't exist on the browser window`, () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.get( 'screenX' ) ).toBeUndefined();
	} );

	it( `::get() should return undefined when the requested property value doesn't exist on the browser window using a path`, () =>
	{
		const service = TestBed.get( WindowService );
		expect( service.get( 'navigator.userAgent.length' ) ).toBeUndefined();
	} );

	it( `::get() should return the default value when the requested property value doesn't exist on the browser window`, () =>
	{
		const foo = 'bar';
		const service = TestBed.get( WindowService );
		expect( service.get( 'screenX', foo ) ).toBe(foo);
	} );

	it( `::get() should return the default value when the requested property value doesn't exist on the browser window using a path`, () =>
	{
		const foo = 'bar';
		const service = TestBed.get( WindowService );
		expect( service.get( 'navigator.userAgent.length', foo ) ).toBe(foo);
	} );
} );
