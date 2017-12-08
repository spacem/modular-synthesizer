import {inject, TestBed} from '@angular/core/testing';

import {WindowService} from './window.service';

describe('WindowService', () => {
	beforeEach(() =>
	{
		TestBed.configureTestingModule(	{
			providers: [WindowService]
		});
	});

	it('should be created', () =>
	{
		const service = TestBed.get(WindowService);
		expect(service).toBeTruthy();
	});

	it('::getWindow() should return the requested window',  () =>
	{
		const mockedWindow = {};
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(mockedWindow as Window) });
		const service = TestBed.get(WindowService);
		expect(service.getWindow()).toBe(mockedWindow);
	});

	//TODO Inject fake window on the service to test for ::has() method
});
