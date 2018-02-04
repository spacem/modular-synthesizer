import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MainPanelRoutingModule } from './main-panel-routing.module';
import { MainPanelComponent } from './main-panel.component';
import { EnvelopeModule } from './modules/components/envelope/envelope.module';
import { KeyboardModule } from './modules/input-controllers/keyboard/keyboard.module';
import { ThereminModule } from './modules/input-controllers/theremin/theremin.module';
import { OscillatorModule } from './modules/sources/oscillator/oscillator.module';
import { WaveformVisualizerModule } from './visualizers/waveform-visualizer/waveform-visualizer/waveform-visualizer.module';

@NgModule( {
	imports: [
		CommonModule,
		SharedModule,
		FormsModule,
		MainPanelRoutingModule,
		OscillatorModule,
		ThereminModule,
		KeyboardModule,
		EnvelopeModule,
		WaveformVisualizerModule
	],
	declarations: [ MainPanelComponent ]
} )
export class MainPanelModule
{
}
