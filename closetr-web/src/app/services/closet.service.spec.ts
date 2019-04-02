import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { Clothing } from '../models/clothing.model';
import { ClosetService } from './closet.service';

describe('ClosetService', () => {
  let httpTestingController: HttpTestingController;
  let closetService: ClosetService;

  const baseUrl = `http://localhost:8080/api/clothes`;

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
    let filterOptions = [
      "no filter",
      "exclude Aritzia items",
      "sweaters only",
      "pants and sweaters only",
      "pants only"
    ];
    let filterOptionsResult = closetService.getFilterOptions();
    expect(filterOptionsResult).toEqual(filterOptions);
  });

  it(`should return correct sort options from
    calling getSortOptions()`, () => {
    let sortOptions = [
      "cost ascending",
      "cost descending",
      "most recently purchased",
      "least recently purchased",
      "most worn"
    ];
    let sortOptionsResult = closetService.getSortOptions();
    expect(sortOptionsResult).toEqual(sortOptions);
  });

  describe(`when trying to set and get clothing
    for edit,`, () => {
    let clothingForEdit;
    beforeEach(() => {
      clothingForEdit = new Clothing({clothingID: 'id'});
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
      const newClothing = new Clothing({
        clothingName: 'TShirt',
        clothingCost: 10,
        clothingWorn: 10,
        clothingPurchaseDate: '2019-03-27',
        clothingCategory: 'Top'
      });
      closetService.addClothing(newClothing)
      .subscribe(data => {
        let clothing = data.data;
        expect(clothing._id).toEqual(newClothingID);
        expect(clothing.clothingWorn).toEqual(newClothing.clothingWorn);
        expect(clothing.clothingCost).toEqual(newClothing.clothingCost);
        expect(clothing.clothingPurchaseDate).toEqual(newClothing.clothingPurchaseDate);
        expect(clothing.clothingCategory).toEqual(newClothing.clothingCategory);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/clothing`);
      expect(req.request.method).toEqual('POST');
      const response = {
        status: 'success',
        data: {
          ...newClothing,
          _id: newClothingID
        }
      };
      req.flush(response);
    });
  });

  describe(`calling editClothing()`, () => {
    it(`should make a POST request to base url with
      given params, and return correct data.`, () => {
      const editedClothingID = 'editedClothingID';
      const editedClothing = new Clothing({
        clothingName: 'TShirt',
        clothingCost: 10,
        clothingWorn: 10,
        clothingPurchaseDate: '2019-03-27',
        clothingCategory: 'Top'
      });
      closetService.editClothing(editedClothing)
      .subscribe(data => {
        let clothing = data.data;
        expect(clothing._id).toEqual(editedClothingID);
        expect(clothing.clothingWorn).toEqual(editedClothing.clothingWorn);
        expect(clothing.clothingCost).toEqual(editedClothing.clothingCost);
        expect(clothing.clothingPurchaseDate).toEqual(editedClothing.clothingPurchaseDate);
        expect(clothing.clothingCategory).toEqual(editedClothing.clothingCategory);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/clothing`);
      expect(req.request.method).toEqual('POST');
      const response = {
        status: 'success',
        data: {
          ...editedClothing,
          _id: editedClothingID
        }
      };
      req.flush(response);
    });
  });

  describe(`calling removeClothing()`, () => {
    it(`should make a DELETE request to base url
      and return correct data.`, () => {
      const deletedClothingID = "clothingID";
      const deletedClothing = {
        clothingID: "clothingID"
      };
      closetService.removeClothing(deletedClothingID)
      .subscribe(data => {
        let clothing = data.data;
        expect(clothing).toEqual(deletedClothing);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/clothing/${deletedClothingID}`);
      expect(req.request.method).toEqual('DELETE');
      const response = {
        status: 'success',
        data: deletedClothing
      };
      req.flush(response);
    });
  });

  describe(`calling getAllClothes()`, () => {
    it(`should make a GET request to base url
      and return correct data.`, () => {
      const user = new User({id: 'Fides'});
      const closetListResult = [
        { clothingID: "1", clothingName: "tshirt" },
        { clothingID: "2", clothingName: "shorts" }
      ];
      closetService.getAllClothes(user)
      .subscribe(data => {
        let closetList = data.data;
        expect(closetList).toEqual(closetListResult);
      });
      const req = httpTestingController.expectOne(`${baseUrl}/all?userID=${user.id}`);
      expect(req.request.method).toEqual('GET');
      const response = {
        status: 'success',
        data: closetListResult
      };
      req.flush(response);
    });
  });

});
