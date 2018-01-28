export interface Source
{
	start():void;
	stop():void;
	setVolume( volume:number ):void;
	mute( value:boolean ):void;
}