import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  /*
  Generic closet service containing methods that help in updating and maintaining
  closet items accross all componenets.
  */
  closetList: any;

  constructor() {
    this.closetList = [];
  }

  /*
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */
  addClothing(clothing: any): void {
      this.closetList.append({
        'clothingName':clothing.clothingName,
        'clothingCost':clothing.clothingCost,
        'clothingCategory':clothing.clothingCategory,
        'clothingWorn': 0
      });
  }

  getAllClothes(): any {
    return this.closetList;
  }

  setAllClothes(closetList: any): void {
    this.closetList = closetList;
  }

}
