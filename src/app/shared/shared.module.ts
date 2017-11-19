import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPanelService} from './services/main-panel.service';

@NgModule({
	imports: [CommonModule],
	providers: [MainPanelService],
	declarations: []
})
export class SharedModule
{
}
