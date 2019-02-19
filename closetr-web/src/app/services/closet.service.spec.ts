import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClosetService } from './closet.service';

describe('ClosetService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    const service: ClosetService = TestBed.get(ClosetService);
    expect(service).toBeTruthy();
  });
});
