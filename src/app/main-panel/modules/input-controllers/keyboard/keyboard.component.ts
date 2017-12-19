import { Component, OnInit } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit
{
	constructor(private mainPanelService:MainPanelService){}

	ngOnInit()
	{
	}

	//TODO Transmit notes, not tones.
	setTone( tone:number )
	{
		//TODO /!\ Make the real internal MIDI connection thing.
		//this.oscillatorService.setTone(tone);
	}
}
