import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { WaveformVisualizerComponent } from './waveform-visualizer.component';

describe( 'WaveformVisualizerComponent', () =>
{
	let component:WaveformVisualizerComponent;
	let fixture:ComponentFixture<WaveformVisualizerComponent>;

	beforeEach( async( () =>
	{
		TestBed.configureTestingModule( {
			imports: [CommonModule, FormsModule],
			declarations: [ WaveformVisualizerComponent ]
		} )
		.compileComponents();
	} ) );

	beforeEach( () =>
	{
		fixture = TestBed.createComponent( WaveformVisualizerComponent );
		component = fixture.componentInstance;
		fixture.detectChanges();
	} );

	it( 'should create', () =>
	{
		expect( component ).toBeTruthy();
	} );
} );
