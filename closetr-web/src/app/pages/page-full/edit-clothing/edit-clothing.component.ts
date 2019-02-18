import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.scss']
})
export class EditClothingComponent implements OnInit {
  clothing: Clothing;
  clothingCategories: Array<string>;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(private closetService: ClosetService,
              private router: Router,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.clothing = this.closetService.getClothingForEdit();
    this.clothingCategories = Clothing.getClothingCategories();

    if (!this.clothing) {
      this.router.navigate(['/closet-manage']);
    }

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    )
  }

  /*
  Go back to the previous page.
  */
  back(): void {
    this.router.navigate(['/closet-manage']);
  }

  /*
  Save the edit clothing item via POST request (future). On successful update of
  clothing item, navigate back to the previous page.
  */
  save(): void {
      this.closetService.editClothing(this.clothing).subscribe(
        (data: any) => {
          this.back();
        }, error => { }
      );
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
