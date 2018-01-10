import { Component } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Voice } from '../../../../shared/models/voice/voice';
import { IInputController } from '../../../models/iinput-controller';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { Note } from '../../../../shared/models/note/note';
import { Subscription } from 'rxjs/Subscription';
import { MidiNoteMessage } from '../../../../shared/models/midi/midi-note-message';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements IInputController
{
	private voice:Voice;
	private channel:number = 1;
	private noteSubsription:Subscription;

	constructor(private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService){}

	public connect():void
	{
		if( this.voice )
			this.voice.disconnect();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = Voice.createVoice(this.mainPanelService.getMainGain(),6);
		this.voice.setWaveformType('sine');

		// FIXME Does it really need to be here (it reflect the key of any external keybord device attached to the same channel) ?
		this.noteSubsription = this.webMIDIService.noteSource$.subscribe( (midiNoteMessage:MidiNoteMessage) =>
		{
			const note:Note = new Note(midiNoteMessage.note);


			//FIXME Implement polyphony
			if( midiNoteMessage.on )
				this.voice.setTones( [note.frequency] );
			else
				this.voice.setTones( [0] );
		});
	}

	public disconnect():void
	{
		this.voice.disconnect();
		this.noteSubsription.unsubscribe();
	}

	public keyDown( note:Note )
	{
		console.log( 'down:', note );

		this.webMIDIService.sendMIDINote( this.channel, note.number, note.velocity, true );
	}

	keyUp( note:Note )
	{
		console.log( 'up:', note );

		this.webMIDIService.sendMIDINote( this.channel, note.number, note.velocity, false );
	}
}
