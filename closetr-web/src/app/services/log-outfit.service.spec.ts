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
      with given params, and return correct data.`, () => {
      const newOutfitEntryID = "outfitEntryID";
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
        expect(outfitEntry._id).toEqual(newOutfitEntryID);
      });
      const req = httpTestingController.expectOne(
        `http://localhost:8080/api/outfitEntries/entry/`,
        newOutfitEntry
      );
      expect(req.request.method).toEqual('POST');
      const response = {
        status: 'success',
        data: {
          ...newOutfitEntry,
          _id: newOutfitEntryID
        }
      };
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
      .subscribe(data => {
        let outfitEntry = data.data;
        expect(outfitEntry.clothing).toEqual(deleteOutfitEntry.clothing);
        expect(outfitEntry.date).toEqual(deleteOutfitEntry.date);
        expect(outfitEntry.user).toEqual(deleteOutfitEntry.user);
        expect(outfitEntry._id).toEqual(deleteOutfitEntry._id);
      });
      const req = httpTestingController.expectOne(
        `http://localhost:8080/api/outfitEntries/entry/${deleteOutfitEntryID}`
      );
      expect(req.request.method).toEqual('DELETE');
      const response = {
        status: 'success',
        data: deleteOutfitEntry
      };
      req.flush(response);
    });
  });
  describe(`calling getAllOutfitClothes(),`, () => {
    it(`should make a GET request to base
      url with converted params, and return
      correct data.`, () => {

    });
  });
});
