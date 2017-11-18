import {Component, OnInit} from '@angular/core';
import {MainPanelService} from '../../../services/main-panel.service';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit
{

	constructor(private mainPanelService:MainPanelService)
	{
	}

	ngOnInit()
	{

	}

	//TODO Transmit notes, not tones.
	setTone(tone:number)
	{
		this.mainPanelService.setTone(tone);
	}
}
