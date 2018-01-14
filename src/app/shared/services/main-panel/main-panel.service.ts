import {Injectable} from '@angular/core';

@Injectable()
export class MainPanelService
{
	protected audioContext:AudioContext;
	protected mainGain:GainNode;
	private started:boolean;

	public getMainGain():GainNode
	{
		return this.mainGain;
	}

	public start():void
	{
		if( this.started )
			return;

		this.audioContext = new (window['AudioContext'] || window['webkitAudioContext'])();
		this.mainGain = this.audioContext.createGain();
		this.mainGain.connect(this.audioContext.destination);
		this.started = true;
	}

	public stop():void
	{
		if( !this.started )
			return;

		this.mainGain.disconnect(this.audioContext.destination);
		this.audioContext.close().then( () =>	this.audioContext = null );

		this.started = false;
	}

	public setVolume( volume:number ):void
	{
		if( this.mainGain )
			this.mainGain.gain.setValueAtTime(volume, this.audioContext.currentTime);
	}
}
