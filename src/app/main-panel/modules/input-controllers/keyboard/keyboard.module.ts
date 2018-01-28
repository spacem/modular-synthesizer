import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KeyboardKeysComponent } from './keyboard-keys/keyboard-keys.component';
import { KeyboardComponent } from './keyboard.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
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
