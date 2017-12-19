import { Component } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent
{
	constructor(private mainPanelService:MainPanelService){}

	//TODO Transmit notes, not tones.
	setTone( tone:number )
	{
		//TODO /!\ Make the real internal MIDI connection thing.
		//this.oscillatorService.setTone(tone);
	}
}
