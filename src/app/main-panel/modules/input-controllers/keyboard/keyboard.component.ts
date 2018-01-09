import { Component, OnInit } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { Voice } from '../../../../shared/models/voice/voice';
import { IInputController } from '../../../models/iinput-controller';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements IInputController
{
	private voice:Voice;

	constructor(private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService){}

	public connect():void
	{
		if( this.voice )
			this.voice.disconnect();

		//TODO Make the real connection thing (probably don't need the main gain reference, just AudioContext or vice versa.
		this.voice = Voice.createVoice(this.mainPanelService.getMainGain(),6);
		this.voice.setWaveformType('sine');
	}

	public disconnect():void
	{
		this.voice.disconnect();
	}

	//TODO Transmit notes, not tones.
	setTone( tone:number )
	{
		console.log( tone );

		this.webMIDIService.sendMIDINote('')

		//TODO /!\ Make the real internal MIDI connection thing.
		this.voice.setTone(tone);
	}
}
