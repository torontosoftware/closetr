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

  it(`calling addOutfitClothing() should make a
      POST request and return correct data.`, () => {
      httpTestHelper(
        httpTestingController,
        logOutfitService.addOutfitClothing,
        mockOutfitEntry,
        `${baseUrl}/`,
        'POST'
      );
  });

  it(`calling deleteOutfitClothing() should make a
      DELETE request and return correct data.`, () => {
      httpTestHelper(
        httpTestingController,
        logOutfitService.deleteOutfitClothing,
        mockOutfitEntry,
        `${baseUrl}/${mockOutfitEntryID}`,
        'DELETE',
        mockOutfitEntryID
      );
  });

  it(`calling getAllOutfitClothes() should make a
      GET request and return correct data.`, () => {
      let { date, userID } = mockOutfitEntryCriteria;
      httpTestHelper(
        httpTestingController,
        logOutfitService.getAllOutfitClothes,
        mockOutfitEntryList,
        `${baseUrl}/?date=${date}&userID=${userID}`,
        'GET',
        mockOutfitEntryCriteria,
        { data: mockOutfitEntryList }
      );
  });
});
