import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThereminComponent } from './theremin.component';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import {WindowService} from '../../../../core/services/window/window.service';
import { EasingHelper } from '../../../../shared/helpers/easing/easing-helper';
import { FormsModule } from '@angular/forms';

describe( 'ThereminComponent', () =>
{
	let component:ThereminComponent;
	let fixture:ComponentFixture<ThereminComponent>;

	beforeEach( async( () =>
	{
		TestBed.configureTestingModule( {
			imports: [FormsModule],
			declarations: [ ThereminComponent ],
			providers: [MainPanelService,WebMIDIService,WindowService,EasingHelper]
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
