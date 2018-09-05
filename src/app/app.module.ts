import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { metaReducers, reducers } from './core/ngrx/reducers';
import { CustomRouterStateSerializer } from './core/ngrx/utils';

@NgModule( {
	declarations:
	[
		AppComponent
	],
	imports:
	[
		BrowserModule,

		// ngrx imports
		StoreModule.forRoot( reducers, { metaReducers } ),
		StoreDevtoolsModule.instrument( {
			name: 'Modular Synthesizer',
			logOnly: environment.production,
		} ),
		EffectsModule.forRoot( [] ),
		StoreRouterConnectingModule.forRoot( {
			stateKey: 'router',
		} ),

		AppRoutingModule // <= Modules import order matters, see: https://angular.io/guide/router#module-import-order-matters
	],
	providers:
	[
		{ provide: RouterStateSerializer, useClass: CustomRouterStateSerializer }
	],
	bootstrap: [ AppComponent ]
} )
export class AppModule
{
}
