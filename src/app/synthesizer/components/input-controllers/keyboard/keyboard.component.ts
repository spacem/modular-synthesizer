import {Component, Host, OnInit} from '@angular/core';
import {KeyboardLayout} from '../../../models/keyboard-layout';
import {MainPanelComponent} from '../../main-panel/main-panel.component';

@Component({
	selector: 'app-keyboard',
	templateUrl: './keyboard.component.html',
	styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit
{
	public keyboard:KeyboardLayout;

	constructor(@Host() private panel: MainPanelComponent){}

	ngOnInit()
	{
		this.keyboard = new KeyboardLayout();
	}

	playNote(frequency:number)
	{
		console.log(frequency);
		this.panel.setTone(frequency);
	}
}
