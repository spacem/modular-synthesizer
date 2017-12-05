import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {KeyboardKeysComponent} from './keyboard-keys/keyboard-keys.component';
import { KeyboardComponent } from './keyboard.component';
import { OscillatorModule } from '../../instruments/oscillator/oscillator.module';
import { OscillatorService } from '../../instruments/oscillator/oscillator.service';

@NgModule({
	imports: [
		CommonModule,
		OscillatorModule
	],
	providers:[OscillatorService],
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
