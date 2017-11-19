import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynthesizerComponent} from './synthesizer.component';
import {SynthesizerRoutingModule} from './synthesizer-routing.module';
import {KeyboardModule} from './modules/input-controllers/keyboard/keyboard.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		SynthesizerRoutingModule,
		KeyboardModule
	],
	declarations: [SynthesizerComponent]
})
export class SynthesizerModule {
}
