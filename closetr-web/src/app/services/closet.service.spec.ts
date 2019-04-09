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
   mockClosetList,
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
    let clothingForEdit;
    beforeEach(() => {
      clothingForEdit = mockClothingEmpty;
      closetService.setClothingForEdit(clothingForEdit);
    });
    it(`should set clothingForEdit when calling
      setClothingForEdit().`, () => {
      expect(closetService.clothingForEdit).toEqual(clothingForEdit);
    });
    it(`should get clothingForEdit when calling
      getClothingForEdit().`, () => {
      let clothingForEditResult = closetService.getClothingForEdit();
      expect(clothingForEditResult).toEqual(clothingForEdit);
    });
  });

  describe(`calling addClothing()`, () => {
    it(`should make a POST request to base url with
      given params, and return correct data.`, () => {
      const newClothingID = "clothingID";
      const newClothing = mockClothingOne;
      closetService.addClothing(newClothing)
        .subscribe(clothing => expect(clothing).toEqual(newClothing));
      const req = httpTestingController.expectOne(`${baseUrl}/clothing`);
      expect(req.request.method).toEqual('POST');
      req.flush(newClothing);
    });
  });

  describe(`calling editClothing()`, () => {
    it(`should make a POST request to base url with
      given params, and return correct data.`, () => {
      const editedClothingID = 'editedClothingID';
      const editedClothing = mockClothingTwo;
      closetService.editClothing(editedClothing)
        .subscribe(clothing => expect(clothing).toEqual(editedClothing));
      const req = httpTestingController.expectOne(`${baseUrl}/clothing`);
      expect(req.request.method).toEqual('POST');
      req.flush(editedClothing);
    });
  });

  describe(`calling removeClothing()`, () => {
    it(`should make a DELETE request to base url
      and return correct data.`, () => {
      const deletedClothingID = "clothingID";
      const deletedClothing = mockClothingOne;
      closetService.removeClothing(deletedClothingID)
        .subscribe(clothing => expect(clothing).toEqual(deletedClothing));
      const req = httpTestingController.expectOne(`${baseUrl}/clothing/${deletedClothingID}`);
      expect(req.request.method).toEqual('DELETE');
      const response = deletedClothing;
      req.flush(response);
    });
  });

  describe(`calling getAllClothes()`, () => {
    it(`should make a GET request to base url
      and return correct data.`, () => {
      const user = new User({id: 'Fides'});
      const closetListResult = mockClosetList;
      closetService.getAllClothes(user)
        .subscribe(closetList => expect(closetList).toEqual(closetListResult));
      const req = httpTestingController.expectOne(`${baseUrl}/all?userID=${user.id}`);
      expect(req.request.method).toEqual('GET');
      const response = closetListResult;
      req.flush(response);
    });
  });

});
