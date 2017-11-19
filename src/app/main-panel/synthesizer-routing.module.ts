import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SynthesizerComponent} from './synthesizer.component';

const routes:Routes =
[
	{
		path: '',
		component: SynthesizerComponent
	}
];

@NgModule({
	imports:
	[
		CommonModule,
		RouterModule.forChild(routes)
	],
	exports:
	[
		RouterModule
	]
})
export class SynthesizerRoutingModule
{
}
