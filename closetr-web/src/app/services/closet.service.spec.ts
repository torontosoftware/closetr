import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpClient, HttpParams } from '@angular/common/http';
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
});
