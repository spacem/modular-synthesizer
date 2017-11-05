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
	protected notes:any[];

	static noteToFrequency(note:number):number
	{
		return Math.pow(2, (note - 49) / 12) * 440.0;
	}

	constructor(){}

	ngOnInit()
	{
		this.generateNotes();
		this.audioContext = new AudioContext();
		this.mainGain = this.audioContext.createGain();
		this.mainGain.connect(this.audioContext.destination);
		this.start();
	}

	generateNotes():void
	{
		const minNote = 24;
		const maxNote = minNote + 18;
		const layout =
		[
			{ en:'C', fr:'do', accidental:false},
			{ en:'C#', fr:'do#', accidental:true},
			{ en:'D', fr:'ré', accidental:false},
			{ en:'D#', fr:'ré#', accidental:true},
			{ en:'E', fr:'mi', accidental:false},
			{ en:'E#', fr:'mi#', accidental:true},
			{ en:'F', fr:'fa', accidental:false},
			{ en:'G', fr:'sol', accidental:false},
			{ en:'G#', fr:'sol#',accidental:true},
			{ en:'A', fr:'la', accidental:false},
			{ en:'A#', fr:'la#', accidental:true},
			{ en:'B', fr:'si', accidental:false}
		];

		this.notes = [];
		for( let i=minNote; i<=maxNote; i++ )
		{
			const octave = Math.floor(i/12);
			const note = i%12;
			const key = layout[note];

			this.notes.push({
				index:i,
				octave: octave,
				accidental: key.accidental,
				name: key.en,
				scientificName: key.en + octave.toString(),
				frequency: MainPanelComponent.noteToFrequency(i-8)
			});
		}

		console.log(this.notes);
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
		this.toneRange.nativeElement.value = tone ;
		//oscillatorNode.frequency.setValueAtTime(frequency, audioContext.currentTime);
	}

	readTone():void
	{
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
		this.readTone();
		this.oscillatorNode.connect(this.mainGain);
		this.oscillatorNode.start(0);

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

	playNote(i:number)
	{
		const frequency:number = MainPanelComponent.noteToFrequency(this.notes[0].index + i );
		console.log(frequency);
		this.setTone(frequency);
		this.readTone();
	}
}
