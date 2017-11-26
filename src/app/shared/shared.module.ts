import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPanelService} from './services/main-panel/main-panel.service';
import {WebmidiService} from './services/webmidi/webmidi.service';

@NgModule({
	imports: [CommonModule],
	providers: [MainPanelService,WebmidiService],
	declarations: []
})
export class SharedModule
{
}
