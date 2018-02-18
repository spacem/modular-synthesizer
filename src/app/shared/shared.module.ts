import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DBModule } from '@ngrx/db';
import { WindowService } from '../core/services/window/window.service';
import { EasingHelper } from './helpers/easing/easing-helper';
import { MathHelper } from './helpers/math/math-helper';
import { MidiHelper } from './helpers/midi/midi-helper';
import { ToneHelper } from './helpers/tone/tone-helper';
import { WebAudioHelper } from './helpers/webaudio/webaudio-helper';
import { ngrxDbSchema } from '../core/ngrx/db';
import { MainPanelService } from './services/main-panel/main-panel.service';
import { WebMIDIService } from './services/webmidi/webmidi.service';

@NgModule({
	imports:
	[
		CommonModule,
		DBModule.provideDB(ngrxDbSchema),
	],
	providers:
	[
		MainPanelService,
		WebMIDIService,
		WindowService,
		EasingHelper,
		WebAudioHelper,
		ToneHelper,
		MathHelper,
		MidiHelper
	]
})
export class SharedModule{}
