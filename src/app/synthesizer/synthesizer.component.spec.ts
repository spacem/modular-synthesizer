import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SynthesizerComponent} from './synthesizer.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('SynthesizerComponent', () => {
	let component: SynthesizerComponent;
	let fixture: ComponentFixture<SynthesizerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [SynthesizerComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SynthesizerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
