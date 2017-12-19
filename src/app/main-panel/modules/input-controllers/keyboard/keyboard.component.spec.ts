import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardComponent } from './keyboard.component';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { KeyboardKeysComponent } from './keyboard-keys/keyboard-keys.component';


describe('KeyboardComponent', () =>
{
	let component:KeyboardComponent;
	let fixture:ComponentFixture<KeyboardComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			providers:[MainPanelService],
			declarations: [KeyboardComponent,KeyboardKeysComponent]
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
