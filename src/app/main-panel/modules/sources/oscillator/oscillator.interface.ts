import { Source } from '../source.interface';

export interface Oscillator extends Source
{
	setFrequency( frequency:number ):void;
	setType( type:string ):void;
	setDetune( detune:number ):void;
	setPhase( phase:number ):void;
}