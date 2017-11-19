import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes:Routes =
[
	{ path: '', loadChildren: 'app/main-panel/synthesizer.module#SynthesizerModule' },
	{ path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes, { enableTracing: false } ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule{}