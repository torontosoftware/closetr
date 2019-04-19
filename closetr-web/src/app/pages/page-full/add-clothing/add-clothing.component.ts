import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoutesService } from '../../../services/routes.service';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';

/*
Form for adding a new clothing item. Uses ClothingFormComponent as a template,
and for form validation.

clothing: Clothing object that is to be created with this form.

prevUrl: The previous url before navigating to this page.

currentUser: The User currently logged in.
*/
@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html'
})

export class AddClothingComponent implements OnInit {
  clothing: Clothing = new Clothing();
  prevUrl: String;
  currentUser: User;

  constructor(private closetService: ClosetService,
              private logOutfitService: LogOutfitService,
              private routesService: RoutesService,
              private authenticationService: AuthenticationService,
              private dateFormatService: DateFormatService,
              private router: Router,
              private location: Location) { }

  /*
  Initial data loading: retrieve current user from authentication service.
  Then, create the instance of Clothing and set the userID for that clothing
  with the currentUser. Then, check previous url from routes service,
  and set prevUrl appropriately.
  */
  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
    this.clothing = new Clothing({ userID: this.currentUser.id });

    if (!(this.prevUrl = this.routesService.getPrevUrl())) {
      this.prevUrl = "/closet-manage";
    }
    this.routesService.setPrevUrl('');
  }

  /*
  Go back to the previous page.
  */
  back = (): Promise<any> => this.router.navigate([this.prevUrl]);

  /*
  Saves the newly created clothing item and saves it in the database.
  It calls closet service's addClothing method with the clothing object. Then,
  if the previous page is the log outfit component, it also logs that new
  clothing in the outfit for today (via log outfit service). After data
  processing, navigates back to previous page.
  */
  save(): void {
    this.closetService.addClothing(this.clothing).subscribe(
      (newClothing: any) => {
        if (this.prevUrl == '/log-outfit') {
          const params = {
            clothingID: newClothing._id,
            userID: this.currentUser.id,
            date: this.dateFormatService.formatDateString(new Date())
          };
          this.logOutfitService.addOutfitClothing(params).subscribe(
            (data: any) => this.back()
          );
        } else {
          this.back();
        }
      }
    );
  }

}
