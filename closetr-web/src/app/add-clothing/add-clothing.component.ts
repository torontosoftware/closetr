import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';
import { LogOutfitService } from '../services/log-outfit.service';

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss']
})

export class AddClothingComponent implements OnInit {
  clothingName: String;
  clothingCost: String;
  clothingCategory: String;
  enableSubmit: boolean;
  closetService: ClosetService;
  logOutfitService: LogOutfitService;

  constructor(private closetservice: ClosetService, private logoutfitservice: LogOutfitService, private _location: Location) {
      this.clothingName = '';
      this.clothingCost = '';
      this.clothingCategory = '';
      this.enableSubmit = false;
      this.closetService = closetservice;
      this.logOutfitService = logoutfitservice;
  }

  back(): void {
    this._location.back();
  }

  save(): void {
      //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
      var newClothing = {
        'clothingName':this.clothingName,
        'clothingCost':this.clothingCost,
        'clothingCategory':this.clothingCategory
      }
      this.logOutfitService.addOutfitClothing(newClothing);
      this.back();
  }

  checkSubmit(): void {
    //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
    if (this.clothingName == '' || this.clothingCost == '' || this.clothingCategory == '') {
      this.enableSubmit = false;
      return;
    }
    this.enableSubmit = true;
  }

  ngOnInit() {
  }

}
