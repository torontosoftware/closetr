import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';
import { RoutesService } from '../services/routes.service';
import { LogOutfitService } from '../services/log-outfit.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { BaseGeneralComponent } from '../base-general/base-general.component';
import { Clothing } from '../models/clothing.model';

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss'],
})

export class AddClothingComponent extends BaseGeneralComponent implements OnInit {
  clothing: Clothing;
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
      this.clothing = new Clothing();
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
  }

  ngOnInit() {
  }

  /*
  Go back to the previous page.
  */
  back(): void {
    if (!this.prevUrl) {
      this.router.navigate(['/closet-manage']);
    } else {
      this.router.navigate([this.prevUrl]);
    }
  }

  /*
  Save the new clothing item via POST request. On successful addition of
  clothing item, navigate back to the previous page.
  */
  save(): void {
    if (this.prevUrl == '/closet-manage') {
      this.closetService.addClothing(this.clothing).subscribe(
        (data: any) => {
          this.back();
        },
        error => { }
      );
    } else {
      this.logOutfitService.addOutfitClothing(this.clothing, 'manual');
    }
  }

  /*
  Called every time user changes any one of the input fields. Ensures that
  none of the fields are empty.
  */
  checkSubmit(): boolean {
    return this.clothing.enableClothingSave();
  }

}
