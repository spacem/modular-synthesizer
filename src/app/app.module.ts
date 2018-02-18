import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { metaReducers, reducers } from './reducers';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		StoreDevtoolsModule.instrument({
			name: 'Modular Synthesizer',
			logOnly: environment.production,
		}),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router',
		}),
		AppRoutingModule // <= Modules import order matters, see: https://angular.io/guide/router#module-import-order-matters
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
