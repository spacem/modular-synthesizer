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
			{ path: '', redirectTo: 'main-panel', pathMatch:'full' },
			{ path: 'main-panel', component: MainPanelComponent }
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
