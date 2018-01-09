import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../../../core/services/window/window.service';
import { MidiNoteMessage } from '../../models/midi/midi-note-message';
import { MidiProgramChangeMessage } from '../../models/midi/midi-program-change-message';

/**
 * Main entry point and adapter for the browser Web MIDI API.
 */
@Injectable()
export class WebMIDIService
{
	private noteSource:Subject<MidiNoteMessage> = new Subject<MidiNoteMessage>();
	public noteSource$:Observable<MidiNoteMessage> = this.noteSource.asObservable();

	private programSource:Subject<MidiProgramChangeMessage> = new Subject<MidiProgramChangeMessage>();
	public programSource$:Observable<MidiProgramChangeMessage> = this.programSource.asObservable();

	private inputs/*WebMidi.MIDIInputMap*/;
	private outputs/*WebMidi.MIDIOutputMap*/;

	private midiMessageEventListener:Function = this.onMidiMessage.bind(this);
	private inputStateChangeEventListener:Function = this.onStateChange.bind(this);
	private midiAccessStateChangeEventListener:Function = this.onMidiAccessStateChange.bind(this);

	constructor( private windowService:WindowService ){}

	/**
	 * Tells if browser supports Web MIDI. It will help in activate MIDI functionalities.
	 *
	 * It doesn't guaranty that MIDI access is effective, which is an asynchronous operation.
	 *
	 * @returns
	 *  Browser supports Web MIDI or not.
	 */
	public browserHasWebMidi():boolean
	{
		//@see https://github.com/Microsoft/TypeScript/blob/master/lib/lib.es6.d.ts
		return this.windowService.hasPath('navigator.requestMIDIAccess');
	}

	/**
	 * Launch the MIDI ports detection and Web MIDI configuration.
	 */
	public connectWebMidi():void
	{
		if( this.browserHasWebMidi() )
		{
			console.info( 'Browser supports Web MIDI.' );

			// Can't simply use this.windowService.get('navigator.requestMIDIAccess') because the browser doesn't want a
			// reference to a native function and warn about an illegal access.
			// noinspection TypeScriptUnresolvedFunction
			this.windowService.get('navigator')['requestMIDIAccess']().then
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
	 * Send a MIDI message on all available connec
	 */
	public sendMIDINote( note )
	{
		// Converting MIDIInputMap to an indexed Array.
		const outputs/*WebMidi.MIDIInput[]*/ = Array.from(this.outputs, o => o[1]);

		// Short-circuiting the system to be able to loopback without any real connected outputs.
		if(outputs.length === 0 )
		{
			const data:Uint8Array = new Uint8Array(8);

		}
		else
		{
			const output:WebMidi.MIDIInput = outputs[0];
		}
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
		console.info('Web MIDI successfully accessed');

		//TODO remove eventListener / disconnect from webMidi
		midiAccess.addEventListener( 'statechange', this.midiAccessStateChangeEventListener);

		if( midiAccess.inputs.size > 0 )
		{
			this.inputs = midiAccess.inputs;

			// Converting MIDIInputMap to an indexed Array.
			const inputs/*WebMidi.MIDIInput[]*/ = Array.from(this.inputs, input => input[1]);

			// Browsers not supporting console.table won't support MIDI either.
			console.table( inputs );

			//TODO Create a visual interface to choose for the MIDI connection.
			const firstFoundInput/*WebMidi.MIDIInput[]*/ = inputs.find( input/*MidiInput*/ => input.state === 'connected' && input.connection === 'closed' );
			if( firstFoundInput )
				this.connectInput(firstFoundInput);
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
	 * Called on any incoming MIDI message from a connected MIDI input port.
	 *
	 * @see http://computermusicresource.com/MIDI.Commands.html
	 *
	 * @param {WebMidi.MIDIMessageEvent} event
	 * 	The corresponding MIDI message event containing the MIDI data to extract.
	 */
	private onMidiMessage( event/*WebMidi.MIDIMessageEvent*/ ):void
	{
		// Implementation for passthru, but it needs to avoid loopback on emitting port.
		//this.outputs.forEach( output => output.send(event.data, event.timeStamp) );

		const data:Uint8Array = event.data;
		const timestamp:number = event.timeStamp;
		console.log( `onMidiMessage: data=${data}, timestamp=${timestamp}` );

		// Always in the range 128-255
		const status:number = data[0];
		const b1:number = data[1];
		const b2:number = data[2];

		/*
			TODO implement, convert Uint8 to number
			@sse https://github.com/cwilso/midi-synth/blob/master/js/midi.js
			const cmd = (data[0] as number) >> 4;
			const channel = (data[0] as number) & 0xf;
		*/

		switch(true)
		{
			// Note Off (channel 1-16)
			case status>=128 && status<=143:
				console.log( `Note Off: channel=${status-128+1}, midiNote=${b1}, velocity=${b2}` );
				this.onMidiNoteMessage( status-128+1, b1, b2, false );
			break;

			// Note On (channel 1-16)
			case status>=144 && status<=159:
				console.log( `Note On: channel=${status-144+1}, midiNote=${b1}, velocity=${b2}` );
				this.onMidiNoteMessage( status-144+1, b1, b2, b2>0 /* If velocity is 0 note is sent as off, a current MIDI behavior */ );
			break;

			// Control (channel 1-16)
			case status>=176 && status<=191:
				console.info(`Control: channel=${status-176+1}, control=${b1}, value=${b2}`);
			break;

			// Program (channel 1-16)
			case status>=192 && status<=207:
				console.info(`Program: channel=${status-192+1}, value=${b1}`);
				this.onProgramChangeMessage( status-192+1, b1);
			break;

			// Pressure (channel 1-16)
			case status>=208 && status<=223:
				console.info(`Pressure: channel=${status-208+1}, value=${b1}`);
			break;

			default:
				console.warn(`Unsupported MIDI message type: ${status}`);
		}
	}

	// noinspection JSMethodCanBeStatic
	/**
	 * Called on any incoming MIDI statechange event from a connected MIDI input port.
	 *
	 * @param event
	 * 	The corresponding MIDI statechange event.
	 */
	private onStateChange( event ):void
	{
		console.info( `Midi Input statechange event:`, event );
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
	private onProgramChangeMessage( channel:number, program:number ):void
	{
		const midiProgramChangeMessage:MidiProgramChangeMessage = new MidiProgramChangeMessage( channel, program );
		this.programSource.next( midiProgramChangeMessage );
	}

	/**
	 * Called on each note MIDI message.
	 *
	 * @param {number} channel
	 * 	The MIDI channel on which the «Note On/Off» message occurred.
	 *
	 * @param {number} note
	 * 	The note to take into account (with C-1 as reference zero note and G-9 as upper note, following MIDI standard).
	 *
	 * @param {boolean} on
	 * 	The note on or off state.
	 *
	 * @param {number} velocity
	 * 	The velocity of the note to take into account (from 0 to 127, following MIDI standard).
	 */
	private onMidiNoteMessage( channel:number, note:number, velocity:number, on:boolean ):void
	{
		const midiNoteMessage:MidiNoteMessage = new MidiNoteMessage( channel, note, velocity, on );
		this.noteSource.next( midiNoteMessage );
	}

	// noinspection JSMethodCanBeStatic
	/**
	 * Called when access request to Web MIDI failed.
	 *
	 * @param {string} message
	 * 	The MIDI input port from which to start receiving messages.
	 */
	private onMIDIFailure( message:string ):void
	{
		console.log('Failed to get MIDI access - ' + message );
	}

	// noinspection JSMethodCanBeStatic
	/**
	 * Called on midi access state change.
	 *
	 * @param {WebMidi.MIDIConnectionEvent} event
	 * 	The Midi Access statechange event emitted by the Web Midi API.
	 */
	private onMidiAccessStateChange( event/*WebMidi.MIDIConnectionEvent*/ ):void
	{
		console.info( `Midi access statechange event:`, event);
		console.log( event );
	}

	/**
	 * Connect the service to the given MIDI input port to start receiving MIDI messages from it.
	 *
	 * @param {WebMidi.MIDIInput} input
	 * 	The MIDI input port from which to start receiving messages.
	 */
	private connectInput( input/*WebMidi.MIDIInput*/ ):void
	{
		console.info( `Connected to MIDI input port: ${input.name}` );
		input.addEventListener( 'statechange', this.inputStateChangeEventListener );
		input.addEventListener( 'midimessage', this.midiMessageEventListener );
	}

	/**
	 * Disconnect the service from the given MIDI input port to stop receiving MIDI messages from it.
	 *
	 * @param {WebMidi.MIDIInput} input
	 * 	The MIDI input port from which to start receiving messages.
	 */
	private disconnectInput( input/*WebMidi.MIDIInput*/ ):void
	{
		console.info( `Disconnected from MIDI input port: ${input.name}` );
		input.removeEventListener( 'statechange', this.inputStateChangeEventListener );
		input.removeEventListener( 'midimessage', this.midiMessageEventListener );
	}
}
