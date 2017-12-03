import { inject, TestBed } from '@angular/core/testing';

import { WebMIDIService } from './webmidi.service';

describe( 'WebMIDIService', () =>
{
	beforeEach( () =>
	{
		TestBed.configureTestingModule( {
			providers: [ WebMIDIService ]
		} );
	} );

	it( 'should be created', inject( [ WebMIDIService ], ( service:WebMIDIService ) =>
	{
		expect( service ).toBeTruthy();
	} ) );
} );
