import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThereminComponent } from './theremin.component';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import {WindowService} from '../../../../core/services/window/window.service';

describe( 'OscillatorComponent', () =>
{
	let component:ThereminComponent;
	let fixture:ComponentFixture<ThereminComponent>;

	beforeEach( async( () =>
	{
		TestBed.configureTestingModule( {
			declarations: [ ThereminComponent ],
			providers: [MainPanelService,WebMIDIService,WindowService]
		} )
			.compileComponents();
	} ) );

	beforeEach( () =>
	{
		fixture = TestBed.createComponent( ThereminComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () =>
	{
		expect( component ).toBeTruthy();
	} );
} );
