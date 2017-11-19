import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes:Routes =
[
	{ path: 'synthesizer', loadChildren: 'app/main-panel/synthesizer.module#SynthesizerModule' },
	{ path: '**', redirectTo: 'synthesizer', pathMatch: 'full' }
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes, { enableTracing: false } ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule{}