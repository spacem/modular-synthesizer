import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Key } from "../../../main-panel/models/key";

@Injectable()
export class WebmidiService
{
	private keySource = new Subject<Key>();
	public keySource$ = this.keySource.asObservable();

	private programSource = new Subject<number>();
	public programSource$ = this.programSource.asObservable();

	private inputs/*WebMidi.MIDIInputMap*/;
	private outputs/*WebMidi.MIDIOutputMap*/;

	constructor()
	{
		//TODO Defer to manage rights to use WebMidi on Sysex.
		this.setupMidi();
	}

	public setupMidi()
	{
		if( navigator[ 'requestMIDIAccess' ] )
		{
			console.log( 'Browser supports MIDI!' );
			navigator[ 'requestMIDIAccess' ]().then
			(
				midiAccess => this.onMIDISuccess( midiAccess ),
				message => this.onMIDIFailure( message )
			);
		}
		else
		{
			console.warn( "No midi access support!" )
		}
	}

	/**
	 * @see http://computermusicresource.com/MIDI.Commands.html
	 * @param {WebMidi.MIDIMessageEvent} event
	 */
	private onMidiMessage( event/*WebMidi.MIDIMessageEvent*/ )
	{
		// Implementation for passthru, but it needs to avoid to loopback on emitting port.
		//this.outputs.forEach( output =>	output.send(event.data, event.timeStamp) );

		const data:Uint8Array = event.data;
		const timestamp:number = event.timeStamp;
		console.log( `onMidiMessage: data=${data}, timestamp=${timestamp}` );

		// Always in the range 128-255
		const status:number = data[0];
		const b1:number = data[1];
		const b2:number = data[2];

		switch(true)
		{
			// Note Off (channel 1-16)
			case status>=128 && status<=143:
				console.log( `onMidiNote: channel=${status-128+1}, midiNote=${b1}, velocity=${b2}` );
				this.onMidiNote( status-128+1, b1, 0 );
			break;

			// Note On (channel 1-16)
			case status>=144 && status<=159:
				console.log( `onMidiNote: channel=${status-144+1}, midiNote=${b1}, velocity=${b2}` );
				this.onMidiNote( status-144+1, b1, b2 );
			break;

			// Control (channel 1-16)
			case status>=176 && status<=191:
				console.info(`Control: channel=${status-176+1}, control=${b1}, value=${b2}`);
			break;

			// Program (channel 1-16)
			case status>=192 && status<=207:
				console.info(`Program: channel=${status-192+1}, value=${b1}`);
				this.onProgramChange( status-192+1, b1);
			break;

			// Pressure (channel 1-16)
			case status>=208 && status<=223:
				console.info(`Pressure: channel=${status-208+1}, value=${b1}`);
			break;

			default:
				console.warn(`Unsupported MIDI message type: ${status}`);
		}
	}

	private onProgramChange( channel:number, program:number ):void
	{
		this.programSource.next( program );
	}

	private onMidiNote( channel:number, midiNote:number, velocity:number )
	{
		const noteOn:boolean = velocity>0;

		const key:Key = new Key(midiNote);
		key.on = noteOn;
		this.setKey( key );
	}

	private setKey( key:Key ):void
	{
		this.keySource.next( key );
	}

	private onMIDISuccess( midiAccess/*WebMidi.MIDIAccess*/ )
	{
		console.log( "MIDI ready!" );

		midiAccess.addEventListener( 'statechange', ( event/*WebMidi.MIDIConnectionEvent*/ ) =>
		{
			console.log( "onstatechange" );
			console.log( event );
		} );

		if( midiAccess.inputs.size > 0 )
		{
			this.inputs = midiAccess.inputs;
			this.inputs.forEach( input =>
			{
				if( input.state === 'connected' && input.connection === 'closed' )
				{
					console.log( `Connected to MIDI input port: ${input.name}`, input );
					input.addEventListener( 'midimessage', ( event/*WebMidi.MIDIMessageEvent*/ ) => this.onMidiMessage( event ) );
					input.addEventListener( 'statechange', event => console.log( event ) );
				}
			} );
		}

		if( midiAccess.outputs.size > 0 )
			this.outputs = midiAccess.outputs;

		if( midiAccess.inputs.size === 0 || midiAccess.outputs.size === 0 )
			console.log( "Uh oh! Couldn't get i/o ports." );
	}

	private onMIDIFailure( message:string )
	{
		console.log( "Failed to get MIDI access - " + message );
	}
}
