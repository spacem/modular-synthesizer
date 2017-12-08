import { inject, TestBed } from '@angular/core/testing';

import { WebMIDIService } from './webmidi.service';
import {WindowService} from '../../../core/services/window/window.service';

describe( 'WebMIDIService', () =>
{
	beforeEach( () =>
	{
		TestBed.configureTestingModule( {
			providers: [ WebMIDIService, WindowService ]
		} );
	} );

	it( 'should be created', inject( [ WebMIDIService ], ( service:WebMIDIService ) =>
	{
		expect( service ).toBeTruthy();
	} ) );
} );
