import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule // <= Modules import order matters, see: https://angular.io/guide/router#module-import-order-matters
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
