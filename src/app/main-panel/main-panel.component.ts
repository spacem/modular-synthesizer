import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { MainPanelService } from '../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../shared/services/webmidi/webmidi.service';
import { KeyboardComponent } from './modules/input-controllers/keyboard/keyboard.component';
import { ThereminComponent } from './modules/input-controllers/theremin/theremin.component';


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
	@ViewChild('volumeRange') volumeRange:ElementRef;

	protected started:boolean = false;
	public volume:number = -20;

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
		this.mainPanelService.setVolume(this.volume);
		this.theremin.connect();
		this.keyboard.connect();
		this.started = true;
	}

	public stop():void
	{
		this.playButton.nativeElement.innerText = 'Play';
		this.theremin.disconnect();
		this.keyboard.disconnect();
		this.mainPanelService.stop();
		this.started = false;
	}

	/**
	 * Set the main volume.
	 *
	 * @param {number} volume
	 * 	Main volume expressed in 0-1.
	 */
	public setVolume( volume:number )
	{
		this.mainPanelService.setVolume( this.volume );
		this.volume = volume;
	}
}
