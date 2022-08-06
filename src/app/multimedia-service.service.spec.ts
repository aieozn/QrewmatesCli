import { TestBed } from '@angular/core/testing';

import { MultimediaServiceService } from './multimedia-service.service';

describe('MultimediaServiceService', () => {
  let service: MultimediaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultimediaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
