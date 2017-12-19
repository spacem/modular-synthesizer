import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscillatorComponent } from './theremin.component';

@NgModule( {
	imports: [
		CommonModule
	],
	declarations: [ OscillatorComponent ],
	exports: [ OscillatorComponent ]
} )
export class OscillatorModule
{
}
