import { TestBed, inject } from '@angular/core/testing';

import { WebmidiService } from './webmidi.service';

describe('WebmidiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebmidiService]
    });
  });

  it('should be created', inject([WebmidiService], (service: WebmidiService) => {
    expect(service).toBeTruthy();
  }));
});
