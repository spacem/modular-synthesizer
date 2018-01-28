import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OscillatorComponent } from './oscillator.component';

@NgModule( {
	imports: [
		CommonModule, FormsModule
	],
	declarations: [ OscillatorComponent ],
	exports: [ OscillatorComponent ]
} )
export class OscillatorModule{}