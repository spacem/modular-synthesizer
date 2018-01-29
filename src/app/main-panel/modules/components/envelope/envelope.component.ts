import { Component, OnInit } from '@angular/core';
import { Envelope } from '../envelope.interface';
import * as Tone from 'tone';

@Component( {
	selector: 'app-envelope',
	templateUrl: './envelope.component.html',
	styleUrls: [ './envelope.component.scss' ]
} )
export class EnvelopeComponent implements OnInit, Envelope
{
	public envelope:Tone.AmplitudeEnvelope;

	public setAttack( attack:number )
	{
		this.envelope.set( {attack});
	}

	public setDecay( decay:number )
	{
		this.envelope.set( {decay});
	}

	public setSustain( sustain:number )
	{
		this.envelope.set( {sustain});
	}

	public setRelease( release:number )
	{
		this.envelope.set( {release});
	}

	ngOnInit()
	{
		this.envelope = new Tone.AmplitudeEnvelope({
			attack : 0.11,
			decay : 0.21,
			sustain : 0.09,
			release : 1.2
		});
	}
}
