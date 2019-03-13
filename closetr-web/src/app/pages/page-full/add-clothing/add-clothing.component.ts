import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoutesService } from '../../../services/routes.service';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
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
  enableSave: boolean;

  constructor(private closetService: ClosetService,
              private logOutfitService: LogOutfitService,
              private routesService: RoutesService,
              private authenticationService: AuthenticationService,
              private dateFormatService: DateFormatService,
              private router: Router,
              private location: Location) {
      super();
      this.clothing = new Clothing();
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.clothing = new Clothing({
          userID: this.currentUser.id
        });
      }
    )

    // items
    this.clothingCategories = Clothing.getClothingCategories();
    // routes
    if (!(this.prevUrl = this.routesService.getPrevUrl())) {
      this.prevUrl = "/closet-manage";
    }
    this.routesService.setPrevUrl('');

    this.checkSubmit();
  }

  /*
  Go back to the previous page.
  */
  back(): void {
    this.router.navigate([this.prevUrl]);
  }

  /*
  Save the new clothing item via POST request. On successful addition of
  clothing item, navigate back to the previous page.
  */
  save(): void {
    console.log("save function was called!");
    this.closetService.addClothing(this.clothing).subscribe(
      (data: any) => {
        if (this.prevUrl == '/log-outfit') {
          let newClothing = data.data;
          console.log(newClothing);
          const params = {
            clothingID: newClothing._id,
            userID: this.currentUser.id,
            date: this.dateFormatService.formatDateString(new Date())
          };
          this.logOutfitService.addOutfitClothing(params).subscribe(
            (data: any) => {
              this.back();
            }
          );
        } else {
          this.back();
        }
      },
      error => { }
    );
  }

  /*
  Called every time user changes any one of the input fields. Ensures that
  none of the fields are empty.
  */
  checkSubmit(): void {
    let result = !(this.clothing.clothingName.length === 0
        || !this.clothing.clothingCost === null
        || this.clothing.clothingCategory.length === 0
        || !this.clothing.clothingWorn === null
        || this.clothing.clothingPurchaseDate.length === 0);

    this.enableSave = result;
  }

}
