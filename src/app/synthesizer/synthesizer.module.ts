import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynthesizerComponent} from './synthesizer.component';
import {SynthesizerRoutingModule} from './synthesizer-routing.module';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { KeyboardComponent } from './components/input-controllers/keyboard/keyboard.component';

@NgModule({
	imports: [
		CommonModule,
		SynthesizerRoutingModule
	],
	declarations: [SynthesizerComponent, MainPanelComponent, KeyboardComponent]
})
export class SynthesizerModule {
}
