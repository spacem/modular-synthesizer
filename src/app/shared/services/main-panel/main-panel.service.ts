import {Injectable} from '@angular/core';
import * as Tone from 'tone';

@Injectable()
export class MainPanelService
{
	private started:boolean;

	public start():void
	{
		if( this.started )
			return;

		const masterCompressor = new Tone.Compressor({
			threshold : -6,
			ratio : 3,
			attack : 0.5,
			release : 0.1
		});

		const lowBump = new Tone.Filter(200, 'lowshelf');
		Tone.Master.chain(lowBump, masterCompressor);

		Tone.Master.set({
			volume  : 0,
			mute  : false
		});

		this.started = true;
	}

	public stop():void
	{
		if( !this.started )
			return;

		//FIXME Should be disposed ?
		Tone.Master.set({mute: true});

		this.started = false;
	}

	// between 0-100
	public setVolume( volume:number ):void
	{
		Tone.Master.set({
			volume  : -100+volume,
			mute  : false
		});
	}
}
