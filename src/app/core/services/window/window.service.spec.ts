import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';
import { DOCUMENT } from '@angular/common';

describe( 'WindowService', () =>
{
	const documentMock =
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
	};

	beforeEach( () =>
	{
		TestBed.configureTestingModule( {
			providers: [{ provide:DOCUMENT, useValue: documentMock }, WindowService ]
		} );
	} );

	it( 'should be created', () =>
	{
		const service = TestBed.get( WindowService );
		expect( service ).toBeTruthy();
	} );

	it( '::getWindow() should return document.parentWindow when it exists', () =>
	{
		const documentMock2 = {	parentWindow:{}	};
		TestBed.overrideProvider(DOCUMENT, { useValue : documentMock2 });

		const service = TestBed.get( WindowService );
		expect( service.getWindow() ).toBe( documentMock2.parentWindow );
	} );

	it( '::getWindow() should return document.defaultView when it exists', () =>
	{
		const documentMock2 = {	defaultView:{}	};
		TestBed.overrideProvider(DOCUMENT, { useValue : documentMock2 });

		const service = TestBed.get( WindowService );
		expect( service.getWindow() ).toBe( documentMock2.defaultView );
	} );

	it( '::getWindow() should return the real browser window when it exists', () =>
	{
		TestBed.overrideProvider(DOCUMENT, { useValue : document });

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
