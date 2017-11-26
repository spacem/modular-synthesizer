import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WebmidiService
{
	private toneSource = new Subject<number>();
	public toneSource$ = this.toneSource.asObservable();

	private inputs/*WebMidi.MIDIInputMap*/;
	private outputs/*WebMidi.MIDIOutputMap*/;

	constructor()
	{
		//TODO Defer!!!
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

	private onMIDIMessage( event/*WebMidi.MIDIMessageEvent*/ )
	{
		console.log( event );
		this.outputs.forEach( output =>
		{
			//output.send(event.data, event.timeStamp);
		} );

		const midiNote:number = event.data[ 1 ];
		const on:boolean = event.data[ 2 ] > 0;

		const frequency:number = WebmidiService.midiNoteToFrequency( on ? midiNote : 0 );
		this.setTone( frequency );
	}

	private setTone( tone:number ):void
	{
		this.toneSource.next( tone );
	}

	private static midiNoteToFrequency( note:number ):number
	{
		return Math.pow( 2, (note - 69) / 12 ) * 440.0;
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
					input.addEventListener( 'midimessage', ( event/*WebMidi.MIDIMessageEvent*/ ) => this.onMIDIMessage( event ) );
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
