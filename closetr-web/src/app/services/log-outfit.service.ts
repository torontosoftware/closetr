import { Injectable } from '@angular/core';
import { ClosetService } from './closet.service';

@Injectable({
  providedIn: 'root'
})

export class LogOutfitService {
  closetService: ClosetService;
  outfitClothingList: Array <any>;

  constructor(private closetservice: ClosetService) {
    this.closetService = closetservice;
    this.outfitClothingList = [
      {clothingCost:'$45',clothingName:'Aritzia TShirt', clothingWorn: 45, clothingCategory:'TShirt'},
      {clothingCost: '$35', clothingName:'Zara Turtleneck TShirt', clothingWorn: 32, clothingCategory:'TShirt'}
    ];
  }

  /*
  Input: clothing object (generic for now)
  Adds clothing to outfit clothing list, and to the closet as well.
  Format {name, cost, category}
  */
  addOutfitClothing(clothing: any): void {
    this.outfitClothingList.push(clothing);
    this.closetService.addClothing(clothing);
  }

  getAllOutfitClothes(): Array<any> {
    return this.outfitClothingList;
  }

  setAllOutfitClothes(outfitClothingList: Array<any>): void {
    this.outfitClothingList = outfitClothingList;
  }
}
