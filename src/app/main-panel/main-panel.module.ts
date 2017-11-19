import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainPanelComponent} from './main-panel.component';
import {MainPanelRoutingModule} from './main-panel-routing.module';
import {KeyboardModule} from './modules/input-controllers/keyboard/keyboard.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		MainPanelRoutingModule,
		KeyboardModule
	],
	declarations: [MainPanelComponent]
})
export class MainPanelModule {
}
