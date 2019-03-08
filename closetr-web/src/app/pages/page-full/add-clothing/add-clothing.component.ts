import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoutesService } from '../../../services/routes.service';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { BaseGeneralComponent } from '../base-general/base-general.component';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss'],
})

export class AddClothingComponent extends BaseGeneralComponent implements OnInit {
  clothing: Clothing;
  prevUrl: String;
  clothingCategories: Array<string>;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(private closetService: ClosetService,
              private logOutfitService: LogOutfitService,
              private routesService: RoutesService,
              private authenticationService: AuthenticationService,
              private router: Router,
              private location: Location) {
      super();
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.clothing = new Clothing({
          userID: this.currentUser.userID
        });
      }
    )

    // items
    this.clothingCategories = Clothing.getClothingCategories();
    console.log(this.routesService.getPrevUrl());
    // routes
    if (!(this.prevUrl = this.routesService.getPrevUrl())) {
      this.prevUrl = "/closet-manage";
    }
    this.routesService.setPrevUrl('');
  }

  /*
  Go back to the previous page.
  */
  back(): void {
    console.log("im going back",this.prevUrl);
    this.router.navigate([this.prevUrl]);
  }

  /*
  Save the new clothing item via POST request. On successful addition of
  clothing item, navigate back to the previous page.
  */
  save(): void {
    console.log("im calling save",this.clothing);
    if (this.prevUrl == '/closet-manage') {
      this.closetService.addClothing(this.clothing).subscribe(
        (data: any) => {
          console.log("got my data result");
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
    if (this.clothing) {
      return this.clothing.enableClothingSave();
    }
    return false;
  }

}
