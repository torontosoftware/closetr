import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';
import { RoutesService } from '../services/routes.service';
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
  routesService: RoutesService;

  constructor(private closetservice: ClosetService,
              private logoutfitservice: LogOutfitService,
              private routesservice: RoutesService,
              private router: Router,
              private location: Location) {
      this.clothing = {
        clothingName: '',
        clothingCost: '',
        clothingCategory: ''
      }
      this.enableSubmit = false;
      this.closetService = closetservice;
      this.logOutfitService = logoutfitservice;
      this.routesService = routesservice;
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
        'clothingCategory':this.clothing.clothingCategory
      }
      if (this.prevUrl == '/closet-manage') {
        this.closetService.addClothing(newClothing);
      } else {
        this.logOutfitService.addOutfitClothing(newClothing);
      }
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
