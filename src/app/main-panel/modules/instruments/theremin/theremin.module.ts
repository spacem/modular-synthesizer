import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThereminComponent } from './theremin.component';

@NgModule( {
	imports: [
		CommonModule
	],
	declarations: [ ThereminComponent ],
	exports: [ ThereminComponent ]
} )
export class OscillatorModule
{
}
