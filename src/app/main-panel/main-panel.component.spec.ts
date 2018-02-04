import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { WindowService } from '../core/services/window/window.service';
import { EasingHelper } from '../shared/helpers/easing/easing-helper';
import { MainPanelService } from '../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../shared/services/webmidi/webmidi.service';

import { MainPanelComponent } from './main-panel.component';
import { EnvelopeModule } from './modules/components/envelope/envelope.module';
import { KeyboardModule } from './modules/input-controllers/keyboard/keyboard.module';
import { ThereminModule } from './modules/input-controllers/theremin/theremin.module';
import { OscillatorModule } from './modules/sources/oscillator/oscillator.module';
import { WaveformVisualizerModule } from './visualizers/waveform-visualizer/waveform-visualizer/waveform-visualizer.module';

describe('MainPanelComponent', () => {
	let component: MainPanelComponent;
	let fixture: ComponentFixture<MainPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule,KeyboardModule,OscillatorModule,FormsModule, ThereminModule, EnvelopeModule, WaveformVisualizerModule],
			declarations: [MainPanelComponent],
			providers:[MainPanelService,WebMIDIService,WindowService,EasingHelper]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MainPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
