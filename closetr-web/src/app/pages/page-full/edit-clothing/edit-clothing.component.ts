import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.scss']
})
export class EditClothingComponent implements OnInit {
  clothing: Clothing = new Clothing();
  clothingCategories: Array<string>;
  currentUser: User;

  constructor(private closetService: ClosetService,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    let clothingForEdit;
    if (clothingForEdit = this.closetService.getClothingForEdit()) {
      this.clothing = clothingForEdit;
    } else {
      this.router.navigate(['/closet-manage']);
    }

    ({ clothingCategories: this.clothingCategories } = Clothing);

    this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    )
  }

  /*
  Go back to the previous page.
  */
  back = (): Promise<boolean> => this.router.navigate(['/closet-manage']);

  /*
  Save the edit clothing item via POST request (future). On successful update of
  clothing item, navigate back to the previous page.
  */
  save = (): Observable<any> => this.closetService.editClothing(this.clothing)
    .subscribe((data: any) => this.back());

  /*
  Called every time user changes any one of the input fields. Ensures that
  none of the fields are empty.
  */
  checkSubmit = (): boolean => {
    return (this.clothing ? this.clothing.enableClothingSave() : false);
  }

}
