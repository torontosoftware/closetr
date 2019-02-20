import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LogOutfitService } from './log-outfit.service';

describe('LogOutfitService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: LogOutfitService = TestBed.get(LogOutfitService);
    expect(service).toBeTruthy();
  });
});
