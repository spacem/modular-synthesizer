import { inject, TestBed } from '@angular/core/testing';

import { WebMIDIService } from './webmidi.service';
import { WindowService } from '../../../core/services/window/window.service';
import { DOCUMENT } from '@angular/common';
import * as lodash from 'lodash-es';

describe( 'WebMIDIService', () =>
{
	const documentMock =
	{
		defaultView:
		{
			navigator:
			{
				requestMIDIAccess: () => new Promise( function( resolve )
				{
					resolve({addEventListener: function(){}, inputs: new Map([['0', {state: 'connected', connection: 'closed'}]])});
				})
			}
		}
	};

	beforeEach( () =>
	{
		TestBed.configureTestingModule( {
			providers: [ {provide:DOCUMENT}, WebMIDIService, WindowService ]
		} );
	} );

	it( 'should be created', inject( [ WebMIDIService ], ( service:WebMIDIService ) =>
	{
		expect( service ).toBeTruthy();
	} ) );

	it( `::browserHasMidi() should return true when requestMIDIAccess is available`, () =>
	{
		const documentMock2 = lodash.cloneDeep(documentMock);
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });

		const service = TestBed.get( WebMIDIService );
		expect( service.browserHasMidi() ).toBe(true);
	} );

	it( `::browserHasMidi() should return false when requestMIDIAccess is unavailable`, () =>
	{
		const documentMock2 = {	defaultView:{navigator:{}}};
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });

		const service = TestBed.get( WebMIDIService );
		expect( service.browserHasMidi() ).toBe(false);
	} );

	it( `::setupMidi() should log that: 'Browser supports Web MIDI.'`, () =>
	{
		const documentMock2 = lodash.cloneDeep(documentMock);
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });

		const service = TestBed.get( WebMIDIService );
		spyOn( documentMock2.defaultView.navigator, 'requestMIDIAccess' ).and.returnValue(new Promise(function(){}));
		const spy = spyOn( console, 'info' );

		service.setupMidi();

		expect( spy ).toHaveBeenCalledWith('Browser supports Web MIDI.');
	} );

	it( `::setupMidi() should log that: 'Browser does not support Web MIDI.'`, () =>
	{
		const documentMock2 = {	defaultView:{navigator:{}}};
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });

		const spy = spyOn( console, 'warn' );

		const service = TestBed.get( WebMIDIService );
		service.setupMidi();

		expect( spy ).toHaveBeenCalledWith('Browser does not support Web MIDI.');
	} );

	it( `::setupMidi() should invoke requestMIDIAccess promise`, () =>
	{
		const documentMock2 = lodash.cloneDeep(documentMock);
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });

		const spyRequestMIDIAccess = spyOn( documentMock2.defaultView.navigator, 'requestMIDIAccess' ).and.returnValue(new Promise(function(){}));
		spyOn( console, 'info' );

		const service = TestBed.get( WebMIDIService );
		service.setupMidi();

		expect( spyRequestMIDIAccess ).toHaveBeenCalled();
	} );



} );
