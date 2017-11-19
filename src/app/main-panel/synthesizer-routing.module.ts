import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SynthesizerComponent} from './synthesizer.component';
import {MainPanelComponent} from './components/main-panel/main-panel.component';

const routes:Routes =
[
	{
		path: '',
		component: SynthesizerComponent,
		children:
		[
			{ path: '', component: MainPanelComponent },
			{ path: '**', redirectTo: '', pathMatch:'full' }
		]
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
