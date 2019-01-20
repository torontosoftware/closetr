import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';
import { RoutesService } from '../services/routes.service';
import { LogOutfitService } from '../services/log-outfit.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { BaseGeneralComponent } from '../base-general/base-general.component';

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss'],
})

export class AddClothingComponent extends BaseGeneralComponent implements OnInit {
  clothing: any;
  enableSubmit: boolean;
  closetService: ClosetService;
  logOutfitService: LogOutfitService;
  routesService: RoutesService;
  prevUrl: String;
  clothingCategories: Array<string>;

  constructor(private closetservice: ClosetService,
              private logoutfitservice: LogOutfitService,
              private routesservice: RoutesService,
              private router: Router,
              private location: Location) {
      super();

      // items
      this.clothing = {
        clothingName: '',
        clothingCost: null,
        clothingCategory: 'Top'
      }
      this.enableSubmit = false;
      this.clothingCategories = [
        "Top",
        "Blouse",
        "Sweater",
        "Jacket/Coat",
        "Bottom",
        "Pants",
        "Skirt",
        "Accesory"
      ];

      // services
      this.closetService = closetservice;
      this.logOutfitService = logoutfitservice;
      this.routesService = routesservice;

      // routes
      this.prevUrl = this.routesService.getPrevUrl();
      this.routesService.setPrevUrl('');
      console.log(this.routesService.getPrevUrl());
  }

  back(): void {
    if (!this.prevUrl) {
      this.router.navigate(['/closet-manage']);
    } else {
      this.router.navigate([this.prevUrl]);
    }
  }

  save(): void {
      //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
      var newClothing = {
        'clothingName':this.clothing.clothingName,
        'clothingCost':this.clothing.clothingCost,
        'clothingCategory':this.clothing.clothingCategory,
        'clothingWorn':this.clothing.clothingWorn
      }
      if (this.prevUrl == '/closet-manage') {
        this.closetService.addClothing(newClothing);
      } else {
        this.logOutfitService.addOutfitClothing(newClothing, 'manual');
      }
      this.back();
  }

  checkSubmit(): void {
    //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
    if (this.clothing.clothingName == ''
    || this.clothing.clothingCost == ''
    || this.clothing.clothingCategory == ''
    || this.clothing.clothingWorn == '') {
      this.enableSubmit = false;
      return;
    }
    this.enableSubmit = true;
  }

  ngOnInit() {
  }

}
