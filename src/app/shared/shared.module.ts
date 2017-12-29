import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelService } from './services/main-panel/main-panel.service';
import { WebMIDIService } from './services/webmidi/webmidi.service';
import {WindowService} from '../core/services/window/window.service';
import { ToneHelper } from './helpers/tone/tone-helper';
import { EasingHelper } from './helpers/easing/easing-helper';

@NgModule({
	imports: [CommonModule],
	providers: [MainPanelService,WebMIDIService,WindowService,ToneHelper, EasingHelper]
})
export class SharedModule
{
}
