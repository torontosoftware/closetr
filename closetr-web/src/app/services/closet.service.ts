import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Clothing } from '../models/clothing.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import {
  httpPostHandlerDefault,
  httpDeleteHandlerDefault,
  httpHandlerPipeMapClothing,
  httpParams
} from './utils/utils';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  baseUrl = `${environment.baseUrl}/clothes`;
  /*
  Generic closet service containing methods that help in updating and maintaining
  closet items accross all componenets.
  */
  clothingForEdit: Clothing;

  constructor(private http: HttpClient) {
  }

  /*
  Filter options for sorting (temporary)
  */
  public filterOptions = [
    "no filter",
    "exclude Aritzia items",
    "sweaters only",
    "pants and sweaters only",
    "pants only"
  ];

  /*
  Sorting options for sorting (temporary)
  */
  public sortOptions = [
    "cost ascending",
    "cost descending",
    "most recently purchased",
    "least recently purchased",
    "most worn"
  ];

  /*
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */
  addClothing = (clothing: Clothing): any =>
    httpPostHandlerDefault(this, `${this.baseUrl}/clothing`, { clothing });

  /*
  Removes clothing object with specified clothingId from the closetList.
  Future: RESTful API for deleting a single clothing object is called, and then
  the updated closetList is recieved via another API call to get all clothes.
  */
  removeClothing = (clothingID: any): any =>
    httpDeleteHandlerDefault(this, `${this.baseUrl}/clothing/${clothingID}`);

  /*
  Sets a clothing object with some clothingID to replace a clothing object
  with the same clothingID in the closetList.
  Future: RESTful API for updating (put) a single clothing object is called.
  Then the updated closetList is recieved via another API call to get all
  clothes.
  */
  editClothing = (editedClothing: Clothing): any =>
    httpPostHandlerDefault(this, `${this.baseUrl}/clothing`, {clothing: editedClothing});

  /*
  Returns an obvervable of an http service that returns all clothing.
  The observer will be able to recieve the data (which is a json of all
  clothing in the closet).
  */
  getAllClothes = (user: User): any => {
    let userID = (user ? user.id : '');
    const params = httpParams({ 'userID': userID });
    return httpHandlerPipeMapClothing(this.http.get(`${this.baseUrl}/all`, { params }));
  }

  /*
  Input: Object array of clothing items. closetList contains parameters:
  clothingCost, clothingWorn, clothingName, and clothingCategory. This is a
  temporary function. In the future, only edited/new/deleted clothing are
  modified in the database.
  */
  setAllClothes(closetList: any): void {
  }

  /*
  Input: clothing object.
  Sets a piece of clothing for editing, as chosen by the user in the Closet
  Manage view. This clothing object is retrieved in the Edit Closet page, where
  the user may edit the clothing.
  */
  setClothingForEdit = (clothing: Clothing): any =>
    this.clothingForEdit = clothing;

  /*
  Returns the clothing object chosen by the user for display in the Edit
  Clothing page.
  */
  getClothingForEdit = (): Clothing => this.clothingForEdit;


}
