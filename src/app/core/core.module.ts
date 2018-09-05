import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { DBModule } from '@ngrx/db';
import { ngrxDbSchema } from './ngrx/db';
import {WindowService} from './services/window/window.service';

@NgModule({
	providers:[WindowService],
	imports: [
		CommonModule,
		DBModule.provideDB(ngrxDbSchema)
	]
})
export class CoreModule {}
