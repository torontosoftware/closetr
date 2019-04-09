import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { Clothing } from '../models/clothing.model';
import { ClosetService } from './closet.service';
import { environment } from '../../environments/environment';
import {
   mockUserOne,
   mockClosetList,
   mockClothingID,
   mockClothingOne,
   mockClothingTwo,
   mockClothingEmpty,
   filterOptions,
   sortOptions
 } from '../../test/objects';
 import {
   httpTestHelper
 } from '../../test/utils';

describe('ClosetService', () => {
  let httpTestingController: HttpTestingController;
  let closetService: ClosetService;

  const baseUrl = `${environment.baseUrl}/clothes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ClosetService ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    closetService = TestBed.get(ClosetService);
  });

  it('should be created', () => {
    expect(closetService).toBeTruthy();
  });

  it(`should return correct filter options from
    calling getFilterOptions()`, () => {
    expect(closetService.getFilterOptions()).toEqual(filterOptions);
  });

  it(`should return correct sort options from
    calling getSortOptions()`, () => {
    expect(closetService.getSortOptions()).toEqual(sortOptions);
  });

  describe(`when trying to set and get clothing
    for edit,`, () => {
    beforeEach(() => {
      closetService.setClothingForEdit(mockClothingEmpty);
    });
    it(`should set clothingForEdit when calling
      setClothingForEdit().`, () => {
      expect(closetService.clothingForEdit).toEqual(mockClothingEmpty);
    });
    it(`should get clothingForEdit when calling
      getClothingForEdit().`, () => {
      expect(closetService.getClothingForEdit()).toEqual(mockClothingEmpty);
    });
  });

  it(`calling addClothing() should make a POST request
      and return correct data.`, () => {
      httpTestHelper(
        httpTestingController,
        closetService.addClothing,
        mockClothingOne,
        `${baseUrl}/clothing`,
        'POST'
      );
  });

  it(`calling editClothing() should make a POST request
      and return correct data.`, () => {
      httpTestHelper(
        httpTestingController,
        closetService.editClothing,
        mockClothingTwo,
        `${baseUrl}/clothing`,
        'POST'
      );
  });

  it(`calling removeClothing() should make a DELETE request
      and return correct data.`, () => {
      httpTestHelper(
        httpTestingController,
        closetService.removeClothing,
        mockClothingOne,
        `${baseUrl}/clothing/${mockClothingID}`,
        'DELETE',
        mockClothingID
      );
  });

  it(`calling getAllClothes() should make a get request
      and return correct data.`, () => {
      httpTestHelper(
        httpTestingController,
        closetService.getAllClothes,
        mockClosetList,
        `${baseUrl}/all?userID=${mockUserOne.id}`,
        'GET',
        mockUserOne,
        { data: mockClosetList }
      );
  });

});
