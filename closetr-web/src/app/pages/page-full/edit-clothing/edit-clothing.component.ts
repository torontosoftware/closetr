import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../../../models/clothing.model';

/*
Form for editing an existing clothing item. Uses ClothingFormComponent as a
template, and for form validation.

clothing: Clothing object to be edited.
*/
@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html'
})
export class EditClothingComponent implements OnInit {
  clothing: Clothing = new Clothing();

  constructor(private closetService: ClosetService,
              private router: Router) { }

  /*
  Initial data loading: retrieve clothing to be edited from closet service.
  If there is no clothing, then navigate back to closet manage page.
  */
  ngOnInit() {
    let clothingForEdit;
    if (clothingForEdit = this.closetService.getClothingForEdit()) {
      this.clothing = clothingForEdit;
    } else {
      this.router.navigate(['/closet-manage']);
    }
  }

  /*
  Go back to the previous page.
  */
  back = (): Promise<boolean> => this.router.navigate(['/closet-manage']);

  /*
  Saves the edited clothing item into the database. It calls closet service's
  editClothing object with the clothing object. On successful update of
  clothing item, navigate back to the previous page.
  */
  save = (): Observable<any> => this.closetService.editClothing(this.clothing)
    .subscribe((data: any) => this.back());

}
