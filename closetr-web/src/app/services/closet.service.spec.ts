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
    let filterOptionsResult = closetService.getFilterOptions();
    expect(filterOptionsResult).toEqual(filterOptions);
  });

  it(`should return correct sort options from
    calling getSortOptions()`, () => {
    let sortOptionsResult = closetService.getSortOptions();
    expect(sortOptionsResult).toEqual(sortOptions);
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
      let clothingForEditResult = closetService.getClothingForEdit();
      expect(clothingForEditResult).toEqual(mockClothingEmpty);
    });
  });

  describe(`calling addClothing()`, () => {
    it(`should make a POST request to base url with
      given params, and return correct data.`, () => {
      closetService.addClothing(mockClothingOne)
        .subscribe(clothing => expect(clothing).toEqual(mockClothingOne));
      const req = httpTestingController.expectOne(`${baseUrl}/clothing`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockClothingOne);
    });
  });

  describe(`calling editClothing()`, () => {
    it(`should make a POST request to base url with
      given params, and return correct data.`, () => {
      closetService.editClothing(mockClothingTwo)
        .subscribe(clothing => expect(clothing).toEqual(mockClothingTwo));
      const req = httpTestingController.expectOne(`${baseUrl}/clothing`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockClothingTwo);
    });
  });

  describe(`calling removeClothing()`, () => {
    it(`should make a DELETE request to base url
      and return correct data.`, () => {
      closetService.removeClothing(mockClothingID)
        .subscribe(clothing => expect(clothing).toEqual(mockClothingOne));
      const req = httpTestingController.expectOne(`${baseUrl}/clothing/${mockClothingID}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockClothingOne);
    });
  });

  describe(`calling getAllClothes()`, () => {
    it(`should make a GET request to base url
      and return correct data.`, () => {
      closetService.getAllClothes(mockUserOne)
        .subscribe(closetList => expect(closetList).toEqual(mockClosetList));
      const req = httpTestingController.expectOne(`${baseUrl}/all?userID=${mockUserOne.id}`);
      expect(req.request.method).toEqual('GET');
      req.flush({data: mockClosetList});
    });
  });

});
