import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KeyboardKeysComponent} from './keyboard-keys.component';
import {MainPanelComponent} from '../../../../components/main-panel/main-panel.component';

describe('KeyboardKeysComponent', () =>
{
	let component:KeyboardKeysComponent;
	let fixture:ComponentFixture<KeyboardKeysComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [KeyboardKeysComponent],
			providers: [MainPanelComponent]
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
