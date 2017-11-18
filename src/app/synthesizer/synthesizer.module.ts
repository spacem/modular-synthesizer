import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SynthesizerComponent} from './synthesizer.component';
import {SynthesizerRoutingModule} from './synthesizer-routing.module';
import {MainPanelComponent} from './components/main-panel/main-panel.component';
import {MainPanelService} from './services/main-panel.service';
import {KeyboardModule} from './modules/input-controllers/keyboard/keyboard.module';

@NgModule({
	imports: [
		CommonModule,
		SynthesizerRoutingModule,
		KeyboardModule
	],
	providers:[MainPanelService],
	declarations: [SynthesizerComponent, MainPanelComponent]
})
export class SynthesizerModule {
}
