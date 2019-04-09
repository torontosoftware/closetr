import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LogOutfitService } from './log-outfit.service';
import { environment } from '../../environments/environment';
import {
  mockOutfitEntryID,
  mockOutfitEntry,
  mockOutfitEntryCriteria,
  mockOutfitEntryList
} from '../../test/objects';

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
      logOutfitService.addOutfitClothing(mockOutfitEntry)
        .subscribe(outfitEntry => expect(outfitEntry).toEqual(mockOutfitEntry));
      const req = httpTestingController.expectOne(`${baseUrl}/`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockOutfitEntry);
    });
  });
  describe(`calling deleteOutfitClothing(),`, () => {
    it(`should make a DELETE request to base url
      with given param, and return correct data.`, () => {
      logOutfitService.deleteOutfitClothing(mockOutfitEntryID)
      .subscribe(outfitEntry => expect(outfitEntry).toEqual(mockOutfitEntry));
      const req = httpTestingController.expectOne(
        `${baseUrl}/${mockOutfitEntryID}`
      );
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockOutfitEntry);
    });
  });
  describe(`calling getAllOutfitClothes(),`, () => {
    it(`should make a GET request to base
      url with converted params, and return
      correct data.`, () => {
      logOutfitService.getAllOutfitClothes(mockOutfitEntryCriteria)
        .subscribe(outfitEntryList => {
          expect(outfitEntryList).toEqual(mockOutfitEntryList);
      });
      const req = httpTestingController.expectOne(
        `${baseUrl}/?date=${mockOutfitEntryCriteria.date}&userID=${mockOutfitEntryCriteria.userID}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush({data: mockOutfitEntryList});
    });
  });
});
