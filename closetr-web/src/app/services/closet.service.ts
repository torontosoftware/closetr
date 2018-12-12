import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  /*
  Generic closet service containing methods that help in updating and maintaining
  closet items accross all componenets.
  */
  closetList: Array<any>;

  constructor() {
    this.closetList = [
      {clothingCost:'$45',clothingName:'Aritzia TShirt', clothingWorn: 45, clothingCategory:'TShirt'},
      {clothingCost: '$35', clothingName:'Zara Turtleneck TShirt', clothingWorn: 32, clothingCategory:'TShirt'},
      {clothingCost: '$99', clothingName:'Aritzia Sweater', clothingWorn: 23, clothingCategory:'Sweater'},
      {clothingCost:'$35',clothingName:'Uniqlo Palazzo Pants', clothingWorn: 17, clothingCategory:'Pants'},
      {clothingCost:'$5',clothingName:'Uniqlo Socks', clothingWorn: 16, clothingCategory:'Socks'},
      {clothingCost:'$35',clothingName:'Zara Cocoon Cardigan', clothingWorn: 15, clothingCategory:'Cardigan'}
    ];
  }

  /*
  Input: clothing object (generic for now)
  Adds the clothing parameter and all of it's properties in the closetList.
  Format {name, cost, category}
  */
  addClothing(clothing: any): void {
      this.closetList.push({
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
