import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {MainPanelService} from '../shared/services/main-panel/main-panel.service';
import {WebMIDIService} from '../shared/services/webmidi/webmidi.service';
import { KeyboardComponent } from './modules/input-controllers/keyboard/keyboard.component';
import { ThereminComponent } from './modules/instruments/theremin/theremin.component';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements AfterViewInit
{
	@ViewChild('play') playButton:ElementRef;
	@ViewChild('keyboard') keyboard:KeyboardComponent;
	@ViewChild('theremin') theremin:ThereminComponent;

	protected started:boolean = false;

	constructor(private mainPanelService:MainPanelService, private webMIDIService:WebMIDIService,){}

	ngAfterViewInit()
	{
		//TODO Create a menu to configure MIDI when MIDI is detected.
		this.webMIDIService.connectWebMidi();

		this.start();
	}

	public togglePlay():void
	{
		this.started ? this.stop() : this.start();
	}

	public start():void
	{
		this.playButton.nativeElement.innerText = 'Stop';
		this.mainPanelService.start();
		this.theremin.connect();
		this.started = true;
	}

	public stop():void
	{
		this.playButton.nativeElement.innerText = 'Play';
		this.theremin.disconnect();
		this.mainPanelService.stop();
		this.started = false;
	}
}
