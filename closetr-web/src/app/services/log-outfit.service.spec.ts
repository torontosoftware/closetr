import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogOutfitService } from './log-outfit.service';
import { environment } from '../../environments/environment';

describe('LogOutfitService', () => {
  let httpTestingController: HttpTestingController;
  let logOutfitService: LogOutfitService;

  const baseUrl = `${environment.baseUrl}/outfitEntries/entry`;

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
      with given params, and return correct data.`, () => {
      const newOutfitEntryID = "outfitEntryID";
      const newOutfitEntry = {
        clothing: "clothingID",
        date: "2019-03-26",
        user: "userID"
      };
      logOutfitService.addOutfitClothing(newOutfitEntry)
      .subscribe(outfitEntry => {
        expect(outfitEntry.clothing).toEqual(newOutfitEntry.clothing);
        expect(outfitEntry.date).toEqual(newOutfitEntry.date);
        expect(outfitEntry.user).toEqual(newOutfitEntry.user);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/`);
      expect(req.request.method).toEqual('POST');
      const response = newOutfitEntry;
      req.flush(response);
    });
  });
  describe(`calling deleteOutfitClothing(),`, () => {
    it(`should make a DELETE request to base url
      with given param, and return correct data.`, () => {
      const deleteOutfitEntryID = "outfitEntryID";
      const deleteOutfitEntry = {
        clothing: "clothingID",
        date: "2019-03-26",
        user: "userID",
        _id: deleteOutfitEntryID
      };
      logOutfitService.deleteOutfitClothing(deleteOutfitEntryID)
      .subscribe(outfitEntry => {
        expect(outfitEntry.clothing).toEqual(deleteOutfitEntry.clothing);
        expect(outfitEntry.date).toEqual(deleteOutfitEntry.date);
        expect(outfitEntry.user).toEqual(deleteOutfitEntry.user);
      });
      const req = httpTestingController.expectOne(
        `${baseUrl}/${deleteOutfitEntryID}`
      );
      expect(req.request.method).toEqual('DELETE');
      const response = deleteOutfitEntry;
      req.flush(response);
    });
  });
  describe(`calling getAllOutfitClothes(),`, () => {
    it(`should make a GET request to base
      url with converted params, and return
      correct data.`, () => {
      const criteria = {
        date: "2019-03-26",
        userID: "userID"
      };
      const outfitEntryListResult = {
        data: [
          { clothing: "1", user: "1" },
          { clothing: "2", user: "2" }
        ]
      };
      const params = new HttpParams({
        fromObject: criteria
      });

      logOutfitService.getAllOutfitClothes(criteria)
      .subscribe(outfitEntryList => {
        expect(outfitEntryList).toEqual(outfitEntryListResult);
      });

      const req = httpTestingController.expectOne(
        `${baseUrl}/?date=${criteria.date}&userID=${criteria.userID}`
      );
      expect(req.request.method).toEqual('GET');
      const response = outfitEntryListResult;
      req.flush(response);
    });
  });
});
