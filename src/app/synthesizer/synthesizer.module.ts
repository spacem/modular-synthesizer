import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynthesizerComponent} from './synthesizer.component';
import {SynthesizerRoutingModule} from './synthesizer-routing.module';
import { MainPanelComponent } from './components/main-panel/main-panel.component';

@NgModule({
	imports: [
		CommonModule,
		SynthesizerRoutingModule
	],
	declarations: [SynthesizerComponent, MainPanelComponent]
})
export class SynthesizerModule {
}
