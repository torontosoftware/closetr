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
import {
  httpTestHelper
} from '../../test/utils';

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

  describe(`when creating http requests,`, () => {
    let httpTestHelperController;
    beforeEach(() => {
      httpTestHelperController = httpTestHelper(httpTestingController);
    });
    it(`calling addOutfitClothing() should make a POST request.`, () => {
        httpTestHelperController(
          logOutfitService.addOutfitClothing,
          mockOutfitEntry,
          `${baseUrl}/`,
          'POST'
        );
    });
    it(`calling deleteOutfitClothing() should make a DELETE request.`, () => {
        httpTestHelperController(
          logOutfitService.deleteOutfitClothing,
          mockOutfitEntry,
          `${baseUrl}/${mockOutfitEntryID}`,
          'DELETE',
          mockOutfitEntryID
        );
    });
    it(`calling getAllOutfitClothes() should make a GET request.`, () => {
        let { date, userID } = mockOutfitEntryCriteria;
        httpTestHelperController(
          logOutfitService.getAllOutfitClothes,
          mockOutfitEntryList,
          `${baseUrl}/?date=${date}&userID=${userID}`,
          'GET',
          mockOutfitEntryCriteria,
          { data: mockOutfitEntryList }
        );
    });
  });
});
