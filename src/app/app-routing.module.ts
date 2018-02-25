import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes:Routes =
[
	{ path: 'main-panel', loadChildren: 'app/main-panel/main-panel.module#MainPanelModule' },
	{ path: 'abc', loadChildren: 'app/main-panel/main-panel.module#MainPanelModule' },
	{ path: 'def', loadChildren: 'app/main-panel/main-panel.module#MainPanelModule' },
	{ path: 'ghi', loadChildren: 'app/main-panel/main-panel.module#MainPanelModule' },
	{ path: 'jkl', loadChildren: 'app/main-panel/main-panel.module#MainPanelModule' },
	{ path: '**', redirectTo: 'main-panel', pathMatch: 'full' }
];

@NgModule( {
	imports: [ RouterModule.forRoot( routes, { enableTracing: false } ) ],
	exports: [ RouterModule ]
} )
export class AppRoutingModule{}