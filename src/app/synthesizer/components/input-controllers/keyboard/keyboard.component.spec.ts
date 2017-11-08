import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {KeyboardComponent} from './keyboard.component';
import {MainPanelComponent} from '../../main-panel/main-panel.component';

describe('KeyboardComponent', () =>
{
	let component:KeyboardComponent;
	let fixture:ComponentFixture<KeyboardComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [KeyboardComponent],
			providers: [MainPanelComponent]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(KeyboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});
