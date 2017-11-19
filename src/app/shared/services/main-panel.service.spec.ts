import {inject, TestBed} from '@angular/core/testing';

import {MainPanelService} from './main-panel.service';

describe('MainPanelService', () =>
{
	beforeEach(() =>
	{
		TestBed.configureTestingModule({
			providers: [MainPanelService]
		});
	});

	it('should be created', inject([MainPanelService], (service:MainPanelService) =>
	{
		expect(service).toBeTruthy();
	}));
});
