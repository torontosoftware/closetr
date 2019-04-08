import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Clothing } from '../models/clothing.model';
import { User } from '../models/user.model';
import { environment } from '../../environments';

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
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */

  addClothing(clothing: Clothing): any {
    var params = {
      clothing: clothing
    };
    return this.http.post(`${this.baseUrl}/clothing`, params);
  }

  /*
  Removes clothing object with specified clothingId from the closetList.
  Future: RESTful API for deleting a single clothing object is called, and then
  the updated closetList is recieved via another API call to get all clothes.
  */
  removeClothing(clothingID: any): any {
    return this.http.delete(`${this.baseUrl}/clothing/${clothingID}`);
  }

  /*
  Sets a clothing object with some clothingID to replace a clothing object
  with the same clothingID in the closetList.
  Future: RESTful API for updating (put) a single clothing object is called.
  Then the updated closetList is recieved via another API call to get all
  clothes.
  */
  editClothing(editedClothing: Clothing): any {
    var params = {
      clothing: editedClothing
    };
    return this.http.post(`${this.baseUrl}/clothing`, params);
    //this.closetList[editedClothing.clothingID] = editedClothing;
  }

  /*
  Returns an obvervable of an http service that returns all clothing.
  The observer will be able to recieve the data (which is a json of all
  clothing in the closet).
  */
  getAllClothes(user: User): any {
    let userID = '';
    if (user) userID = user.id;
    const params = new HttpParams({
      fromObject: {
        'userID': userID
      }
    });
    return this.http.get(`${this.baseUrl}/all`, {params});
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
  setClothingForEdit(clothing: Clothing): any {
    this.clothingForEdit = clothing;
  }

  /*
  Returns the clothing object chosen by the user for display in the Edit
  Clothing page.
  */
  getClothingForEdit(): Clothing {
    return this.clothingForEdit;
  }

  /*
  Returns filter options for sorting (temporary)
  */
  getFilterOptions(): Array<string> {
    return [
      "no filter",
      "exclude Aritzia items",
      "sweaters only",
      "pants and sweaters only",
      "pants only"
    ];
  }

  /*
  Returns sorting options for sorting (temporary)
  */
  getSortOptions(): Array<string> {
    return [
      "cost ascending",
      "cost descending",
      "most recently purchased",
      "least recently purchased",
      "most worn"
    ];
  }

}
