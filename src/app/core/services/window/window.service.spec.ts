import { TestBed } from '@angular/core/testing';

import { WindowService } from './window.service';

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

	it('::getWindow() should return the injected documentMock.defaultView',  () =>
	{
		const documentMock:Document = { defaultView: {} } as Document;
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(documentMock) });

		const service = TestBed.get(WindowService);
		expect(service.getWindow()).toBe(documentMock.defaultView);
	});

	it('::getWindow() should return the real browser window when it exists',  () =>
	{
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(document) });

		const service = TestBed.get(WindowService);
		expect(service.getWindow()).toBe(window);
	});

	it(`::has() should return true when window has the requested property`,  () =>
	{
		const documentMock:Document = { defaultView: { name:'mockedWindowName' } } as Document;
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(documentMock) });

		const service = TestBed.get(WindowService);
		expect(service.has('name')).toBeTruthy();
	});

	it(`::has() should return false when window does not have the requested property`,  () =>
	{
		const documentMock:Document = { defaultView: {} } as Document;
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(documentMock) });

		const service = TestBed.get(WindowService);
		expect(service.has('name')).toBeFalsy();
	});

	it('::get() should return the requested property value on the browser window',  () =>
	{
		const documentMock:Document = { defaultView: { name:'mockedWindowName' } } as Document;
		TestBed.overrideProvider(WindowService, { useValue : new WindowService(documentMock) });

		const service = TestBed.get(WindowService);
		expect(service.get('name')).toBe('mockedWindowName');
	});
});
