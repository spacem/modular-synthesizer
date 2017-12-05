import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPanelComponent} from './main-panel.component';
import {RouterTestingModule} from '@angular/router/testing';
import {KeyboardModule} from './modules/input-controllers/keyboard/keyboard.module';
import {MainPanelService} from '../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../shared/services/webmidi/webmidi.service';
import { OscillatorModule } from './modules/instruments/oscillator/oscillator.module';

describe('MainPanelComponent', () => {
	let component: MainPanelComponent;
	let fixture: ComponentFixture<MainPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule,KeyboardModule,OscillatorModule],
			declarations: [MainPanelComponent],
			providers:[MainPanelService,WebMIDIService]
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
