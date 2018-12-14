import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.scss']
})
export class EditClothingComponent implements OnInit {
  clothingName: String;
  clothingCost: String;
  clothingID: String;
  clothingCategory: String;
  clothingWorn: String;
  enableSubmit: boolean;
  closetService: ClosetService;

  constructor(private closetservice: ClosetService, private _location: Location) {
      this.enableSubmit = false;
      this.closetService = closetservice;
  }

  back(): void {
    this._location.back();
  }

  save(): void {
      //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
      var editedClothing = {
        'clothingID': this.clothingID,
        'clothingWorn': this.clothingWorn,
        'clothingName':this.clothingName,
        'clothingCost':this.clothingCost,
        'clothingCategory':this.clothingCategory
      }
      this.closetService.editClothing(editedClothing);
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
