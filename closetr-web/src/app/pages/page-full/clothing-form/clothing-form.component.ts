import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';

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

  constructor(private closetService: ClosetService,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    ({ clothingCategories: this.clothingCategories } = Clothing);
    this.currentUser = this.authenticationService.currentUserValue;
  }

  /*
  Called every time user changes any one of the input fields. Ensures that
  none of the fields are empty.
  */
  checkSubmit = (): boolean =>
    (this.clothing ? this.clothing.enableClothingSave() : false);

}
