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

  describe(`calling addOutfitClothing(),`, () => {
    it(`should make a POST request to base url
      with given params.`, () => {

    });
    it(`should return the observable result.`, () => {

    });
  });
  describe(`calling deleteOutfitClothing(),`, () => {
    it(`should make a DELETE request to base url
      with given params.`, () => {

    });
    it(`should return the observable result.`, () => {

    });
  });
  describe(`calling getAllOutfitClothes(),`, () => {
    it(`should create HttpParams with the
      given params.`, () => {

    });
    it(`should make a GET request to base
      url with converted params.`, () => {

    });
    it(`should return the observable result.`, () => {

    });
  });
});
