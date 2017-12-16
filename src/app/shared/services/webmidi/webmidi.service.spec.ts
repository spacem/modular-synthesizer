import { inject, TestBed } from '@angular/core/testing';

import { WebMIDIService } from './webmidi.service';
import { WindowService } from '../../../core/services/window/window.service';
import { DOCUMENT } from '@angular/common';
import * as lodash from 'lodash-es';

import { MidiNoteMessage } from '../../models/midi/midi-note-message';
import { MidiProgramChangeMessage } from '../../models/midi/midi-program-change-message';

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

		// noinspection JSIgnoredPromiseFromCall
		expect( spy ).toHaveBeenCalledWith('Browser supports Web MIDI.');
	} );

	it( `::setupMidi() should log that: 'Browser does not support Web MIDI.'`, () =>
	{
		const documentMock2 = {	defaultView:{navigator:{}}};
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });
		const service = TestBed.get( WebMIDIService );

		const spy = spyOn( console, 'warn' );

		service.setupMidi();

		// noinspection JSIgnoredPromiseFromCall
		expect( spy ).toHaveBeenCalledWith('Browser does not support Web MIDI.');
	} );

	it( `::setupMidi() should invoke requestMIDIAccess promise`, () =>
	{
		const documentMock2 = lodash.cloneDeep(documentMock);
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });
		const service = TestBed.get( WebMIDIService );

		// noinspection JSUnusedLocalSymbols
		const fakePromise = { then: (resolve, reject)=> void 0 };
		const spy = spyOn( documentMock2.defaultView.navigator, 'requestMIDIAccess' ).and.returnValue(fakePromise);
		spyOn( console, 'info' );

		service.setupMidi();

		// noinspection JSIgnoredPromiseFromCall
		expect( spy ).toHaveBeenCalled();
	} );

	it( `::setupMidi() requestMIDIAccess promise should call ::onMIDISuccess() when succeeding`, () =>
	{
		const documentMock2 = lodash.cloneDeep(documentMock);
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });
		const service = TestBed.get( WebMIDIService );

		// The promise is immediately resolved, but it is only valid while we do not need true async behavior.
		// noinspection JSUnusedLocalSymbols
		const fakePromise = {then: (resolve, reject) => resolve('midiSuccess')};
		spyOn( documentMock2.defaultView.navigator, 'requestMIDIAccess' ).and.returnValue(fakePromise);
		spyOn( console, 'info' );

		const spy = spyOn( service, 'onMIDISuccess' );

		service.setupMidi();

		// noinspection JSIgnoredPromiseFromCall
		expect( spy ).toHaveBeenCalledWith('midiSuccess');
	} );

	it( `::setupMidi() requestMIDIAccess promise should call ::onMIDIFailure() when failing`, () =>
	{
		const documentMock2 = lodash.cloneDeep(documentMock);
		TestBed.overrideProvider(DOCUMENT, { useValue: documentMock2 });
		const service = TestBed.get( WebMIDIService );

		// The promise is immediately resolved, but it is only valid while we do not need true async behavior.
		// noinspection JSUnusedLocalSymbols
		const fakePromise = {then: (resolve, reject) => reject('midiFailure')};
		spyOn( documentMock2.defaultView.navigator, 'requestMIDIAccess' ).and.returnValue(fakePromise);
		spyOn( console, 'info' );

		const spy = spyOn( service, 'onMIDIFailure' );

		service.setupMidi();

		// noinspection JSIgnoredPromiseFromCall
		expect( spy ).toHaveBeenCalledWith('midiFailure');
	} );

	it( `::onProgramChangeMessage() should notify programSource$ of changes`, done =>
	{
		const service = TestBed.get( WebMIDIService );

		const steps =
		[
			new MidiProgramChangeMessage(10, 2),
			new MidiProgramChangeMessage(5, 127),
			new MidiProgramChangeMessage(0, 0),
			new MidiProgramChangeMessage(16, 127)
		];

		let step = 0;
		service.programSource$.subscribe( value =>
		{
			// noinspection JSIgnoredPromiseFromCall
			expect( JSON.stringify(value) ).toBe(JSON.stringify(steps[step]));
			if( ++step >= steps.length )
				done();
		});

		steps.forEach( programChange => service.onProgramChangeMessage( programChange.channel, programChange.program ) );
	} );

	it( `::onMidiNoteMessage() should notify noteSource$ of changes`, done =>
	{
		const service = TestBed.get( WebMIDIService );

		const steps =
		[
			new MidiNoteMessage(10, 2, 38, true),
			new MidiNoteMessage(5, 127, 24, false),
			new MidiNoteMessage(0, 0, 0, true),
			new MidiNoteMessage(16, 127, 127, false)
		];

		let step = 0;
		service.noteSource$.subscribe( value =>
		{
			// noinspection JSIgnoredPromiseFromCall
			expect( JSON.stringify(value) ).toBe(JSON.stringify(steps[step]));
			if( ++step >= steps.length )
				done();
		});

		steps.forEach( midiNote => service.onMidiNoteMessage( midiNote.channel, midiNote.note, midiNote.velocity, midiNote.on ) );
	} );
} );
