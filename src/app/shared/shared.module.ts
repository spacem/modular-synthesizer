import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelService } from './services/main-panel/main-panel.service';
import { WebMIDIService } from './services/webmidi/webmidi.service';
import {WindowService} from '../core/services/window/window.service';

@NgModule({
	imports: [CommonModule],
	providers: [MainPanelService,WebMIDIService,WindowService]
})
export class SharedModule
{
}
