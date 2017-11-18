import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPanelComponent} from './main-panel.component';
import {KeyboardKeysComponent} from '../../modules/input-controllers/keyboard/keyboard-keys/keyboard-keys.component';

describe('MainPanelComponent', () => {
	let component: MainPanelComponent;
	let fixture: ComponentFixture<MainPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MainPanelComponent,KeyboardKeysComponent]
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
