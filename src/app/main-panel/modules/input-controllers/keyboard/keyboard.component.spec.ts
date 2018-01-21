import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KeyboardComponent } from './keyboard.component';
import { MainPanelService } from '../../../../shared/services/main-panel/main-panel.service';
import { KeyboardKeysComponent } from './keyboard-keys/keyboard-keys.component';
import { WindowService } from '../../../../core/services/window/window.service';
import { WebMIDIService } from '../../../../shared/services/webmidi/webmidi.service';
import { FormsModule } from '@angular/forms';


describe('KeyboardComponent', () =>
{
	let component:KeyboardComponent;
	let fixture:ComponentFixture<KeyboardComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			imports:[FormsModule],
			providers:[MainPanelService,WebMIDIService,WindowService],
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
