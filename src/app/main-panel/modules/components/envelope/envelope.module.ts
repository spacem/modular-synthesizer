import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnvelopeComponent } from './envelope.component';

@NgModule( {
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [ EnvelopeComponent ],
	exports: [ EnvelopeComponent ],
} )
export class EnvelopeModule
{
}
