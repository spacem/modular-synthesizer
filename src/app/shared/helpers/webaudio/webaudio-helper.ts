import { Injectable } from '@angular/core';

@Injectable()
export class WebAudioHelper
{
	public static WAVES:OscillatorType[] =
	[
		'sawtooth',
		'sine',
		'square',
		'triangle'
	];
}
