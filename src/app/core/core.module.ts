import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WindowService} from './services/window/window.service';

@NgModule({
	providers:[WindowService],
	imports: [
		CommonModule
	]
})
export class CoreModule {}
