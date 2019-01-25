import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  /*
  Generic closet service containing methods that help in updating and maintaining
  closet items accross all componenets.
  */
  closetList: any;
  closetCount: number;
  clothingForEdit: any;
  data: any;

  constructor(private http: HttpClient) {
  }

  /*
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */

  addClothing(clothing: any): any {
    var params = {
      clothing: clothing
    };
    return this.http.post('http://localhost:8080/api/clothes/clothing', params);
  }

  /*
  Removes clothing object with specified clothingId from the closetList.
  Future: RESTful API for deleting a single clothing object is called, and then
  the updated closetList is recieved via another API call to get all clothes.
  */
  removeClothing(clothingID: any): any {
    var url = 'http://localhost:8080/api/clothes/clothing/' + clothingID;
    return this.http.delete(url);
  }

  /*
  Sets a clothing object with some clothingID to replace a clothing object
  with the same clothingID in the closetList.
  Future: RESTful API for updating (put) a single clothing object is called.
  Then the updated closetList is recieved via another API call to get all
  clothes.
  */
  editClothing(editedClothing: any): any {
    var params = {
      clothing: editedClothing
    };
    return this.http.post('http://localhost:8080/api/clothes/clothing', params);
    //this.closetList[editedClothing.clothingID] = editedClothing;
  }

  /*
  Returns an obvervable of an http service that returns all clothing.
  The observer will be able to recieve the data (which is a json of all
  clothing in the closet).
  */
  getAllClothes(): any {
    return this.http.get('http://localhost:8080/api/clothes/all');
  }

  /*
  Input: Object array of clothing items. closetList contains parameters:
  clothingCost, clothingWorn, clothingName, and clothingCategory. This is a
  temporary function. In the future, only edited/new/deleted clothing are
  modified in the database.
  */
  setAllClothes(closetList: any): void {
    this.closetList = closetList;
  }

  /*
  Input: clothing object.
  Sets a piece of clothing for editing, as chosen by the user in the Closet
  Manage view. This clothing object is retrieved in the Edit Closet page, where
  the user may edit the clothing.
  */
  setClothingForEdit(clothing: any): any {
    this.clothingForEdit = clothing;
  }

  /*
  Returns the clothing object chosen by the user for display in the Edit
  Clothing page.
  */
  getClothingForEdit(): any {
    return this.clothingForEdit;
  }

}
