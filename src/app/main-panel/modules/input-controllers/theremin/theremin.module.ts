import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThereminComponent } from './theremin.component';

@NgModule( {
	imports: [
		CommonModule, FormsModule
	],
	declarations: [ ThereminComponent ],
	exports: [ ThereminComponent ]
} )
export class ThereminModule{}
