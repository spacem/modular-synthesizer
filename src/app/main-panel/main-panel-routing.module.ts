import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MainPanelComponent} from './main-panel.component';

const routes:Routes =
[
	{
		path: '',
		component: MainPanelComponent
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
export class MainPanelRoutingModule
{
}
