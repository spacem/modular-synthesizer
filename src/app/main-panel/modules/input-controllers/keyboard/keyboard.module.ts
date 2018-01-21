import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeyboardKeysComponent} from './keyboard-keys/keyboard-keys.component';
import { KeyboardComponent } from './keyboard.component';
import { OscillatorModule } from '../theremin/theremin.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		OscillatorModule
	],
	declarations: [
		KeyboardKeysComponent,
		KeyboardComponent
	],
	exports:[
		KeyboardComponent
	]
})
export class KeyboardModule
{
}
