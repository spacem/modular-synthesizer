import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WaveformVisualizerComponent } from './waveform-visualizer.component';

@NgModule( {
	imports: [
		CommonModule, FormsModule
	],
	declarations: [ WaveformVisualizerComponent ],
	exports: [ WaveformVisualizerComponent ]
} )
export class WaveformVisualizerModule
{
}
