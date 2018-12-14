import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../services/closet.service';
import { LogOutfitService } from '../services/log-outfit.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss']
})

export class AddClothingComponent implements OnInit {
  clothing: any;
  enableSubmit: boolean;
  closetService: ClosetService;
  logOutfitService: LogOutfitService;

  constructor(private closetservice: ClosetService, private logoutfitservice: LogOutfitService, private router: Router) {
      this.clothing = {
        clothingName: '',
        clothingCost: '',
        clothingCategory: ''
      }
      this.enableSubmit = false;
      this.closetService = closetservice;
      this.logOutfitService = logoutfitservice;
  }

  back(): void {
    this.router.navigate(['/log-outfit']);
  }

  save(): void {
      //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
      var newClothing = {
        'clothingName':this.clothing.clothingName,
        'clothingCost':this.clothing.clothingCost,
        'clothingCategory':this.clothing.clothingCategory
      }
      this.logOutfitService.addOutfitClothing(newClothing);
      this.back();
  }

  checkSubmit(): void {
    //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
    if (this.clothing.clothingName == '' || this.clothing.clothingCost == '' || this.clothing.clothingCategory == '') {
      this.enableSubmit = false;
      return;
    }
    this.enableSubmit = true;
  }

  ngOnInit() {
  }

}
