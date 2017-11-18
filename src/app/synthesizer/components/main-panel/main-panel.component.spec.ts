import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPanelComponent} from './main-panel.component';
import {KeyboardModule} from '../../modules/input-controllers/keyboard/keyboard.module';
import {MainPanelService} from '../../services/main-panel.service';

describe('MainPanelComponent', () => {
	let component: MainPanelComponent;
	let fixture: ComponentFixture<MainPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports:[ KeyboardModule ],
			declarations: [MainPanelComponent],
			providers:[MainPanelService]
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
