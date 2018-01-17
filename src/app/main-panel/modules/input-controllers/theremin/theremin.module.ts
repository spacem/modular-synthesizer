import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThereminComponent } from './theremin.component';
import { FormsModule } from '@angular/forms';

@NgModule( {
	imports: [
		CommonModule, FormsModule
	],
	declarations: [ ThereminComponent ],
	exports: [ ThereminComponent ]
} )
export class OscillatorModule
{
}
