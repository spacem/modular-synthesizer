import { Component, OnInit } from '@angular/core';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { OscillatorService } from '../../instruments/oscillator/oscillator.service';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit
{

	constructor(private mainPanelService:MainPanelService, private oscillatorService:OscillatorService){}

	ngOnInit()
	{
	}

	//TODO Transmit notes, not tones.
	setTone(tone:number)
	{
		//TODO Make the real connection thing.
		this.oscillatorService.setTone(tone);
	}
}
