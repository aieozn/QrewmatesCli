import { TestBed } from '@angular/core/testing';

import { MenuEventsService } from './menu-events.service';

describe('MenuEventsServiceService', () => {
  let service: MenuEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
