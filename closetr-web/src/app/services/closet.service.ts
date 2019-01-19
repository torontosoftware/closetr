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
    this.http.get('http://localhost:8080/api/clothes/all').subscribe(
      (data: any) => {
        this.data = data;
        this.closetList = this.data.data;
        this.closetCount = this.closetList.length;
        console.log(this.closetList, this.closetCount);
      }, // success path
      error => {
        console.log(error);
      }
    );
    //console.log(this.data);
    //this.closetCount = 0;
    /*
    this.closetList = {
      1: {clothingID: 1, clothingCost:'$45',clothingName:'Aritzia TShirt', clothingWorn: 45, clothingCategory:'TShirt'},
      2: {clothingID: 2, clothingCost: '$35', clothingName:'Zara Turtleneck TShirt', clothingWorn: 32, clothingCategory:'TShirt'},
      3: {clothingID: 3, clothingCost: '$99', clothingName:'Aritzia Sweater', clothingWorn: 23, clothingCategory:'Sweater'},
      4: {clothingID: 4, clothingCost:'$35',clothingName:'Uniqlo Palazzo Pants', clothingWorn: 17, clothingCategory:'Pants'},
      5: {clothingID: 5, clothingCost:'$5',clothingName:'Uniqlo Socks', clothingWorn: 16, clothingCategory:'Socks'},
      6: {clothingID: 6, clothingCost:'$35',clothingName:'Zara Cocoon Cardigan', clothingWorn: 15, clothingCategory:'Cardigan'}
    };*/
  }

  /*
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */

  addClothing(clothing: any): void {
    var newClothing = {
      'clothingName':clothing.clothingName,
      'clothingCost':clothing.clothingCost,
      'clothingCategory':clothing.clothingCategory,
      'clothingWorn': 0
    }
    var params = {
      clothing: newClothing
    };
    this.http.post('http://localhost:8080/api/clothes/clothing', params).subscribe(
      (data: any) => {
        console.log(data);
      }, // success path
      error => {
        console.log(error);
      }
    );
  }

  removeClothing(clothingID: any): void {
    delete this.closetList[clothingID];
  }

  editClothing(editedClothing: any): void {
    this.closetList[editedClothing.clothingID] = editedClothing;
  }

  getAllClothes(): any {
    return this.closetList;
  }

  setAllClothes(closetList: any): void {
    this.closetList = closetList;
  }

  setClothingForEdit(clothing: any): void {
    this.clothingForEdit = clothing;
  }

  getClothingForEdit(): any {
    return this.clothingForEdit;
  }

}
