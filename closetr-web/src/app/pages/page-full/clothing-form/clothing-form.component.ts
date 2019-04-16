import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';

/*
Generic form for editing fields of a Clothing object. Displays clothingName,
clothingCost, clothingCategory, clothingWorn, and clothingPurchaseDate as fields
available for editing.

Form contains a save button that is controlled by the enableSave variable
(which is evaluated via validators). Once save button is enabled and clicked,
it calls a save function that has been wired to the component via an
EventEmitter.

@Input pageTitle: The title of the form, e.g. 'add clothing.'

@Input clothing: Clothing object to be displayed for edit. Defaults to
empty Clothing object.

@Output save: Event Emitter that calls a given save function whenever emitted.

clothingCategories: Clothing categories to be displayed as options in the
clothingCategory selector.

currentUser: the User currently logged in.

enableSave: boolean reflecting whether form is valid or not.
*/
@Component({
  selector: 'app-clothing-form',
  templateUrl: './clothing-form.component.html',
  styleUrls: ['./clothing-form.component.scss']
})
export class ClothingFormComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() clothing: Clothing = new Clothing();
  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  clothingCategories: Array<string>;
  currentUser: User;
  enableSave: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  /*
  Initial data loading: retrieve clothing categories from Clothing object,
  and set the current user from authentication service.
  */
  ngOnInit() {
    ({ clothingCategories: this.clothingCategories } = Clothing);
    this.currentUser = this.authenticationService.currentUserValue;
  }

  /*
  Called every time user changes any one of the input fields. Ensures that
  none of the fields are empty or have invalid values. Sets the enableSave
  variable to reflect whether form is valid.
  */
  checkSubmit = (): void => {
    let {
      clothingName,
      clothingCost,
      clothingCategory,
      clothingWorn,
      clothingPurchaseDate
    } = this.clothing;
    let result = !(clothingName.length === 0
        || clothingCost === null
        || clothingCategory.length === 0
        || !clothingWorn === null
        || clothingPurchaseDate.length === 0);
    this.enableSave = result;
  }

}
