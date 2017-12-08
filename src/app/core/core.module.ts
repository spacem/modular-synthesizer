import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WindowService} from './services/window/window.service';

@NgModule({
	imports: [
		CommonModule
	],
	exports: [WindowService]
})
export class CoreModule {}
