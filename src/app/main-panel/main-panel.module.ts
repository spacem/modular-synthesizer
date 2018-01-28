import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MainPanelRoutingModule } from './main-panel-routing.module';
import { MainPanelComponent } from './main-panel.component';
import { KeyboardModule } from './modules/input-controllers/keyboard/keyboard.module';
import { ThereminModule } from './modules/input-controllers/theremin/theremin.module';
import { OscillatorModule } from './modules/source/oscillator/oscillator.module';

@NgModule( {
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		MainPanelRoutingModule,
		OscillatorModule,
		ThereminModule,
		KeyboardModule
	],
	declarations: [ MainPanelComponent ]
} )
export class MainPanelModule
{
}
