import { Injectable } from '@angular/core';
import { ClosetService } from './closet.service';

@Injectable({
  providedIn: 'root'
})

export class LogOutfitService {
  closetService: ClosetService;
  outfitClothingCount: number;
  outfitClothingList: any;

  constructor(private closetservice: ClosetService) {
    this.closetService = closetservice;
    this.outfitClothingCount = 2;
    this.outfitClothingList = {
      1: {clothingID: 1, clothingCost:'$45',clothingName:'Aritzia TShirt', clothingWorn: 45, clothingCategory:'TShirt'},
      2: {clothingID: 2, clothingCost: '$35', clothingName:'Zara Turtleneck TShirt', clothingWorn: 32, clothingCategory:'TShirt'}
    };
  }

  generateOutfitClothingID(): number {
    this.outfitClothingCount++;
    return this.outfitClothingCount;
  }

  /*
  Input: clothing object (generic for now)
  Adds clothing to outfit clothing list, and to the closet as well.
  Format {name, cost, category}
  */
  addOutfitClothing(clothing: any): void {
    var newOutfitClothingID = this.generateOutfitClothingID();
    var newOutfitClothing = {
      'clothingID': newOutfitClothingID,
      'clothingName': clothing.clothingName,
      'clothingCost': clothing.clothingCost,
      'clothingCategory': clothing.clothingCategory,
      'clothingWorn': 0
    };
    this.outfitClothingList[newOutfitClothingID] = newOutfitClothing;
    this.closetService.addClothing(clothing);
  }

  getAllOutfitClothes(): any {
    return this.outfitClothingList;
  }

  setAllOutfitClothes(outfitClothingList: any): void {
    this.outfitClothingList = outfitClothingList;
  }
}
