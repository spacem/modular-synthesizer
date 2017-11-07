import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
	selector: 'app-main-panel',
	templateUrl: './main-panel.component.html',
	styleUrls: ['./main-panel.component.css']
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

	constructor(){}

	ngOnInit()
	{
		this.audioContext = new AudioContext();
		this.mainGain = this.audioContext.createGain();
		this.mainGain.connect(this.audioContext.destination);
		this.start();
	}


	togglePlay():void
	{
		this.started ? this.stop() : this.start();
	}

	create():OscillatorNode
	{
		return this.audioContext.createOscillator();
	}

	setTone( tone:number ):void
	{
		console.log(tone);
		this.toneRange.nativeElement.value = tone ;
		if(this.oscillatorNode)
		//	this.oscillatorNode.frequency.value = +this.toneRange.nativeElement.value;
			this.oscillatorNode.frequency.setValueAtTime(+this.toneRange.nativeElement.value, this.audioContext.currentTime);
	}


	readWaveformType():void
	{
		if(this.oscillatorNode)
			this.oscillatorNode.type = this.waveformSelect.nativeElement.value;
	}

	start():void
	{
		this.playButton.nativeElement.innerText = 'Stop';
		this.mainGain.gain.value = 1;

		this.oscillatorNode = this.create();
		this.readWaveformType();
		this.oscillatorNode.connect(this.mainGain);
		this.oscillatorNode.start(0);
		this.setTone(0);

		this.started = true;
	}

	stop():void
	{
		this.playButton.nativeElement.innerText = 'Play';
		this.mainGain.gain.value = 0;

		this.oscillatorNode.disconnect(this.mainGain);
		this.oscillatorNode = null;

		this.started = false;
	}

}
