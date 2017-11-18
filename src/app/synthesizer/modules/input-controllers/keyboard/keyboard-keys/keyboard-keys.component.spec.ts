import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KeyboardKeysComponent} from './keyboard-keys.component';
import {KeyboardComponent} from '../keyboard.component';
import {MainPanelService} from '../../../../services/main-panel.service';

describe('KeyboardKeysComponent', () =>
{
	let component:KeyboardKeysComponent;
	let fixture:ComponentFixture<KeyboardKeysComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [KeyboardKeysComponent],
			providers: [KeyboardComponent,MainPanelService]
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
