import {Injectable} from '@angular/core';

@Injectable()
export class MainPanelService
{
	protected audioContext:AudioContext;
	protected mainGain:GainNode;

	public getMainGain():GainNode
	{
		return this.mainGain;
	}

	public start():void
	{
		//TODO Check for AudioContext availability.
		//TODO Destroy the old AudioContext first.
		this.audioContext = new (window['AudioContext'] || window['webkitAudioContext'])();
		this.mainGain = this.audioContext.createGain();
		this.mainGain.connect(this.audioContext.destination);
	}

	public stop():void
	{
		if( this.mainGain )
			this.setVolume(0);
	}

	public setVolume( volume:number ):void
	{
		if( this.mainGain )
			this.mainGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
	}
}
