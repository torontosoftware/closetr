import { TestBed } from '@angular/core/testing';

import { LogOutfitService } from './log-outfit.service';

describe('LogOutfitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogOutfitService = TestBed.get(LogOutfitService);
    expect(service).toBeTruthy();
  });
});
