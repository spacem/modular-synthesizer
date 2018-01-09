import { Component, OnInit } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Voice } from '../../../../shared/models/voice/voice';
import { IInputController } from '../../../models/iinput-controller';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { Key } from '../../../models/key';
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
			const note:Key = new Key(midiNoteMessage.note);

			if( midiNoteMessage.on )
				this.voice.setTone( note.frequency );
			// FIXME Need to set off only the targeted tone
			//else
			//	this.voice.setTone( 0 );
		});
	}

	public disconnect():void
	{
		this.voice.disconnect();
		this.noteSubsription.unsubscribe();
	}

	public keyDown( key:Key )
	{
		console.log( 'down:', key );

		this.webMIDIService.sendMIDINote(this.channel, key.number, key.velocity, true);
	}

	keyUp( key:Key )
	{
		console.log( 'up:', key );

		this.webMIDIService.sendMIDINote(this.channel, key.number, key.velocity, false);
	}
}
