import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as Tone from 'tone';
import { WebAudioHelper } from '../../../../shared/helpers/webaudio/webaudio-helper';
import {Oscillator} from './oscillator.interface';

@Component( {
	selector: 'app-oscillator',
	templateUrl: './oscillator.component.html',
	styleUrls: [ './oscillator.component.scss' ]
} )
export class OscillatorComponent implements OnInit,AfterViewInit, Oscillator
{
	public osc:Tone.Oscillator;
	public stopped:boolean = true;
	public waveforms:OscillatorType[] = WebAudioHelper.WAVES;

	@Input()
	public envelope:Tone.Envelope;

	@Input()
	public waveform:Tone.Waveform;

	ngOnInit()
	{
		this.osc = new Tone.Oscillator({
			frequency : 374,
			volume : -10,
			type: 'sine'
		});
	}

	ngAfterViewInit()
	{
		if( this.envelope )
			this.osc.connect(this.envelope).toMaster();

		if( this.waveform )
			this.osc.fan( this.waveform ).toMaster();
	}

	public setFrequency(frequency:number)
	{
		this.osc.set({frequency});
		//this.envelope.triggerAttackRelease(3);
	}

	public start():void
	{
		this.osc.start();
		this.stopped = false;
	}

	public stop():void
	{
		this.osc.stop();
		this.stopped = true;
	}

	public setVolume( volume:number ):void
	{
		this.osc.set({volume});
	}

	public mute( value:boolean ):void
	{
		this.osc.mute = value;
	}

	public setType( type:string ):void
	{
		this.osc.set({type});
	}

	public setDetune( detune:number ):void
	{
		this.osc.set({detune});
	}

	public setPhase( phase:number ):void
	{
		this.osc.set({phase});
	}
}
