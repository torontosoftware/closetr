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

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss'],
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
  Save the new clothing item via POST request. On successful addition of
  clothing item, navigate back to the previous page.
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
