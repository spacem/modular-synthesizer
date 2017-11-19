import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeyboardKeysComponent} from './keyboard-keys/keyboard-keys.component';
import { KeyboardComponent } from './keyboard.component';

@NgModule({
	imports: [
		CommonModule
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
