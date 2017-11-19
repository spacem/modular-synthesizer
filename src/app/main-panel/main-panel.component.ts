import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainPanelService} from '../shared/services/main-panel.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit
{

	@ViewChild('play') playButton:ElementRef;
	@ViewChild('waveform') waveformSelect:ElementRef;
	@ViewChild('tone') toneRange:ElementRef;

	protected audioContext:AudioContext;
	protected oscillatorNode:OscillatorNode;
	protected mainGain:GainNode;
	protected started:boolean = false;

	constructor( mainPanelService:MainPanelService )
	{
		mainPanelService.toneSource$.subscribe( tone => this.setTone(tone) );
	}

	ngOnInit()
	{
		this.audioContext = new AudioContext();
		this.mainGain = this.audioContext.createGain();
		this.mainGain.connect(this.audioContext.destination);
		this.start();
	}

	public togglePlay():void
	{
		this.started ? this.stop() : this.start();
	}

	protected create():OscillatorNode
	{
		return this.audioContext.createOscillator();
	}

	public setTone( tone:number ):void
	{
		//TODO parse value
		this.toneRange.nativeElement.value = tone ;

		if(this.oscillatorNode)
		//	this.oscillatorNode.frequency.value = +this.toneRange.nativeElement.value;
			this.oscillatorNode.frequency.setValueAtTime(+this.toneRange.nativeElement.value, this.audioContext.currentTime);
	}

	public setWaveformType():void
	{
		if(this.oscillatorNode)
			this.oscillatorNode.type = this.waveformSelect.nativeElement.value;
	}

	public start():void
	{
		this.playButton.nativeElement.innerText = 'Stop';
		this.mainGain.gain.setValueAtTime(1, this.audioContext.currentTime);

		this.oscillatorNode = this.create();
		this.setWaveformType();
		this.oscillatorNode.connect(this.mainGain);
		this.oscillatorNode.start(0);
		this.setTone(0);

		this.started = true;
	}

	public stop():void
	{
		this.playButton.nativeElement.innerText = 'Play';
		this.mainGain.gain.setValueAtTime(0, this.audioContext.currentTime);

		this.oscillatorNode.disconnect(this.mainGain);
		this.oscillatorNode = null;

		this.started = false;
	}
}
