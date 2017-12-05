import { inject, TestBed } from '@angular/core/testing';

import { OscillatorService } from './oscillator.service';

describe( 'OscillatorService', () =>
{
	beforeEach( () =>
	{
		TestBed.configureTestingModule( {
			providers: [ OscillatorService ]
		} );
	} );

	it( 'should be created', inject( [ OscillatorService ], ( service:OscillatorService ) =>
	{
		expect( service ).toBeTruthy();
	} ) );
} );
