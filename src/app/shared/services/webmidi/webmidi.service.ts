import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Key } from '../../../main-panel/models/key';
import { Observable } from 'rxjs/Observable';

/**
 * Main entry point and adapter for the browser Web MIDI API.
 */
@Injectable()
export class WebMIDIService
{
	private keySource:Subject<Key> = new Subject<Key>();
	public keySource$:Observable<Key> = this.keySource.asObservable();

	private programSource:Subject<number> = new Subject<number>();
	public programSource$:Observable<number> = this.programSource.asObservable();

	private inputs/*WebMidi.MIDIInputMap*/;
	private outputs/*WebMidi.MIDIOutputMap*/;

	constructor()
	{
		//TODO Defer to manage rights to use WebMidi on Sysex.
		this.setupMidi();
	}

	/**
	 * Launch the MIDI ports detection and configuration.
	 */
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
			console.warn( 'Browser does not support Web MIDI.' );
		}
	}

	/**
	 * Called on any incoming MIDI message from a connected MIDI input port.
	 *
	 * @see http://computermusicresource.com/MIDI.Commands.html
	 *
	 * @param {WebMidi.MIDIMessageEvent} event
	 * 	The corresponding MIDI message event containing the MIDI data to extract.
	 */
	private onMidiMessage( event/*WebMidi.MIDIMessageEvent*/ )
	{
		// Implementation for passthru, but it needs to avoid loopback on emitting port.
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
				console.log( `Note Off: channel=${status-128+1}, midiNote=${b1}, velocity=${b2}` );
				this.onMidiNote( status-128+1, b1, 0 );
			break;

			// Note On (channel 1-16)
			case status>=144 && status<=159:
				console.log( `Note On: channel=${status-144+1}, midiNote=${b1}, velocity=${b2}` );
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

	/**
	 * Called on each «Program Change» MIDI message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel on which the program change occurred.
	 *
	 * @param {number} program
	 * 	The new program number on which to map MIDI notes for this channel.
	 */
	private onProgramChange( channel:number, program:number ):void
	{
		this.programSource.next( program );
	}

	/**
	 * Called on each «Note On/Off» MIDI message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel on which the «Note On/Off» message occurred.
	 *
	 * @param {number} midiNote
	 * 	The note to take into account (with C-1 as reference zero note and G-9 as upper note, following MIDI standard).
	 *
	 * @param {number} velocity
	 * 	The velocity of the note to take into account (from 0 to 127, following MIDI standard).
	 */
	private onMidiNote( channel:number, midiNote:number, velocity:number ):void
	{
		//TODO Create a true onMidiNoteOn and onMidiNoteOff message support.
		const noteOn:boolean = velocity>0;

		const key:Key = new Key(midiNote);
		key.on = noteOn;
		this.setKey( key );
	}

	/**
	 * Emit a key change event to all subscribers of the $keySource Observable.
	 *
	 * @param {Key} key
	 * 	The key object associated to the key change event.
	 */
	private setKey( key:Key ):void
	{
		this.keySource.next( key );
	}

	/**
	 * Called when Web MIDI access attempt succeed.
	 *
	 * Will start the MIDI service configuration and connection depending on found MIDI I/O ports.
	 *
	 * @param {WebMidi.MIDIAccess} midiAccess
	 * 	The Web MIDI Access object on which to operate I/O connections.
	 */
	private onMIDISuccess( midiAccess/*WebMidi.MIDIAccess*/ ):void
	{
		console.info('Web MIDI accessed');

		midiAccess.addEventListener( 'statechange', ( event/*WebMidi.MIDIConnectionEvent*/ ) =>
		{
			console.info( `Midi Access statechange event:`, event);
			console.log( event );
		} );

		if( midiAccess.inputs.size > 0 )
		{
			this.inputs = midiAccess.inputs;

			// Converting MIDIInputMap to an indexed Array.
			const inputs/*WebMidi.MIDIInput[]*/ = Array.from(this.inputs, input => input[1]);

			// Browsers not supporting console.table won't support MIDI either.
			console.table( inputs );

			//TODO Create an interface to choose for the MIDI connection.
			const firstDisconnectedInput/*WebMidi.MIDIInput[]*/ = inputs.find( input/*MidiInput*/ => input.state === 'connected' && input.connection === 'closed' );
			if( firstDisconnectedInput )
				this.connectInput(firstDisconnectedInput);
			else
				console.warn(`Can't find any available MIDI port to connect to.`);
		}
		else
			console.warn('No input MIDI port detected.');

		if( midiAccess.outputs.size > 0 )
			this.outputs = midiAccess.outputs;
		else
			console.warn('No output MIDI port detected.');
	}

	/**
	 * Connect to the given MIDI input port to start receiving MIDI messages.
	 *
	 * @param {WebMidi.MIDIInput} input
	 * 	The MIDI input port from which to start receiving messages.
	 */
	private connectInput( input/*WebMidi.MIDIInput*/ ):void
	{
		console.log( `Connected to MIDI input port: ${input.name}` );
		input.addEventListener( 'statechange', event => console.info( `Midi Input statechange event:`, event) );
		input.addEventListener( 'midimessage', ( event/*WebMidi.MIDIMessageEvent*/ ) => this.onMidiMessage( event ) );
	}

	/**
	 * Called when the MIDI access attempt to Web MIDI API failed.
	 *
	 * @param {string} message
	 * 	The MIDI input port from which to start receiving messages.
	 */
	private onMIDIFailure( message:string ):void
	{
		console.log('Failed to get MIDI access - ' + message );
	}
}
