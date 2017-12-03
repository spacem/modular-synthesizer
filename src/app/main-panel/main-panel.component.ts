import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MainPanelService} from '../shared/services/main-panel/main-panel.service';
import {WebMIDIService} from '../shared/services/webmidi/webmidi.service';

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

	constructor( private mainPanelService:MainPanelService,  private webmidiService:WebMIDIService )
	{
	}

	ngOnInit()
	{
		this.mainPanelService.toneSource$.subscribe( tone => this.setTone(tone) );
		this.webmidiService.keySource$.subscribe( key => this.setTone(key.on ? key.frequency : 0) );
		this.webmidiService.programSource$.subscribe( bank => this.setWaveformType(	['sine', 'square', 'sawtooth', 'triangle'][bank%4] as OscillatorType ) );

		this.audioContext = new (window['AudioContext'] || window['webkitAudioContext'])();
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

	public setWaveformType( waveformType:OscillatorType ):void
	{
		this.waveformSelect.nativeElement.value = waveformType;

		if(this.oscillatorNode)
			this.oscillatorNode.type = waveformType;
	}

	public start():void
	{
		this.playButton.nativeElement.innerText = 'Stop';
		this.mainGain.gain.setValueAtTime(1, this.audioContext.currentTime);

		this.oscillatorNode = this.create();
		this.setWaveformType(this.waveformSelect.nativeElement.value);
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
