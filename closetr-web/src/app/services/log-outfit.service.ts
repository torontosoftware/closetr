import { Injectable } from '@angular/core';
import { ClosetService } from './closet.service';

@Injectable({
  providedIn: 'root'
})

export class LogOutfitService {
  outfitClothingCount: number;
  outfitClothingList: any;

  constructor(private closetService: ClosetService) {
    this.outfitClothingList = {
      1: {outfitClothingID: 1, clothingID: 1, clothingCost:'$45',clothingName:'Aritzia TShirt', clothingWorn: 45, clothingCategory:'TShirt'},
      2: {outfitClothingID: 2, clothingID: 2, clothingCost: '$35', clothingName:'Zara Turtleneck TShirt', clothingWorn: 32, clothingCategory:'TShirt'}
    };
  }

  /*
  Input: clothing object (generic for now)
  Adds clothing to outfit clothing list, and to the closet as well.
  Format {name, cost, category}
  */
  addOutfitClothing(clothing: any, mode: String): void {
    var newOutfitClothing = {
      'outfitClothingID': newOutfitClothingID,
      'clothingID': clothing.clothingID,
      'clothingName': clothing.clothingName,
      'clothingCost': clothing.clothingCost,
      'clothingCategory': clothing.clothingCategory,
      'clothingWorn': 0
    };
    this.outfitClothingList[newOutfitClothingID] = newOutfitClothing;

    // further actions depending on mode
    switch (mode) {
      case 'search':
        break;
      case 'manual':
        this.closetService.addClothing(clothing);
        break;
    }
  }

  getAllOutfitClothes(): any {
    return this.outfitClothingList;
  }

  setAllOutfitClothes(outfitClothingList: any): void {
    this.outfitClothingList = outfitClothingList;
  }
}
