import { TestBed } from '@angular/core/testing';

import { ClosetService } from './closet.service';

describe('ClosetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClosetService = TestBed.get(ClosetService);
    expect(service).toBeTruthy();
  });
});
