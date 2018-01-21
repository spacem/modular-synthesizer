import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelComponent } from './main-panel.component';
import { MainPanelRoutingModule } from './main-panel-routing.module';
import { KeyboardModule } from './modules/input-controllers/keyboard/keyboard.module';
import { SharedModule } from '../shared/shared.module';
import { OscillatorModule } from './modules/input-controllers/theremin/theremin.module';
import { FormsModule } from '@angular/forms';

@NgModule( {
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		MainPanelRoutingModule,
		OscillatorModule,
		KeyboardModule
	],
	declarations: [ MainPanelComponent ]
} )
export class MainPanelModule
{
}
