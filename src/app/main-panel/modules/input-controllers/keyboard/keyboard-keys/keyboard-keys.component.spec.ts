import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardKeysComponent } from './keyboard-keys.component';
import { KeyboardComponent } from '../keyboard.component';
import { MainPanelService } from '../../../../../shared/services/main-panel/main-panel.service';
import { WebMIDIService } from '../../../../../shared/services/webmidi/webmidi.service';
import { WindowService } from '../../../../../core/services/window/window.service';

describe('KeyboardKeysComponent', () =>
{
	let component:KeyboardKeysComponent;
	let fixture:ComponentFixture<KeyboardKeysComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [KeyboardKeysComponent],
			providers: [KeyboardComponent,MainPanelService,WebMIDIService,WindowService]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(KeyboardKeysComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});
