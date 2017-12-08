import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscillatorComponent } from './oscillator.component';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { OscillatorService } from './oscillator.service';
import {WindowService} from '../../../../core/services/window/window.service';

describe( 'OscillatorComponent', () =>
{
	let component:OscillatorComponent;
	let fixture:ComponentFixture<OscillatorComponent>;

	beforeEach( async( () =>
	{
		TestBed.configureTestingModule( {
			declarations: [ OscillatorComponent ],
			providers: [MainPanelService,WebMIDIService,OscillatorService,WindowService]
		} )
			.compileComponents();
	} ) );

	beforeEach( () =>
	{
		fixture = TestBed.createComponent( OscillatorComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () =>
	{
		expect( component ).toBeTruthy();
	} );
} );
