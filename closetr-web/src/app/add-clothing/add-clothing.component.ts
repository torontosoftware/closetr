import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';

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

  constructor(private closetservice: ClosetService, private _location: Location) {
      this.clothingName = '';
      this.clothingCost = '';
      this.clothingCategory = '';
      this.enableSubmit = false;
      this.closetService = closetservice;
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
      this.closetService.addClothing(newClothing);
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
