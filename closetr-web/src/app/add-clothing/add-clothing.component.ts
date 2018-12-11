import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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

  back(): void {
    this._location.back();
  }

  save(): void {
      console.log(this.clothingName, this.clothingCost, this.clothingCategory);
  }

  checkSubmit(): void {
    console.log(this.clothingName, this.clothingCost, this.clothingCategory);
    if (this.clothingName == '' || this.clothingCost == '' || this.clothingCategory == '') {
      this.enableSubmit = false;
      return;
    }
    this.enableSubmit = true;
  }

  constructor(private _location: Location) {
      this.clothingName = '';
      this.clothingCost = '';
      this.clothingCategory = '';
      this.enableSubmit = false;
  }

  ngOnInit() {
  }

}
