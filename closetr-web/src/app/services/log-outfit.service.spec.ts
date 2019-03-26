import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LogOutfitService } from './log-outfit.service';

describe('LogOutfitService', () => {
  let httpTestingController: HttpTestingController;
  let logOutfitService: LogOutfitService;

  const baseUrl = "http://localhost:8080/outfit"

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LogOutfitService ],
      imports: [ HttpClientTestingModule ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    logOutfitService = TestBed.get(LogOutfitService);
  });

  it('should be created', () => {
    expect(logOutfitService).toBeTruthy();
  });

  describe(`calling addOutfitClothing(),`, () => {
    it(`should make a POST request to base url
      with given params.`, () => {
      const newOutfitEntry = {
        clothing: "clothingID",
        date: "2019-03-26",
        user: "userID"
      };

      logOutfitService.addOutfitClothing(newOutfitEntry)
        .subscribe(data => {
          let outfitEntry = data.data;
          expect(outfitEntry.clothing).toEqual(newOutfitEntry.clothing);
          expect(outfitEntry.date).toEqual(newOutfitEntry.date);
          expect(outfitEntry.user).toEqual(newOutfitEntry.user);
        });

      const req = httpTestingController.expectOne(
        `http://localhost:8080/api/outfitEntries/entry/`,
        newOutfitEntry
      );

      const response = {
        status: 'success',
        data: newOutfitEntry
      };

      req.flush(response);
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
