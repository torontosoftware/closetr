import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../services/closet.service';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.scss']
})
export class EditClothingComponent implements OnInit {
  clothing: any;
  enableSubmit: boolean;
  closetService: ClosetService;
  clothingCategories: Array<string>;

  constructor(private closetservice: ClosetService, private router: Router) {
      this.enableSubmit = false;
      this.closetService = closetservice;
      this.clothing = this.closetService.getClothingForEdit();

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

      if (!this.clothing) {
        this.router.navigate(['/closet-manage']);
      }

      this.checkSubmit();
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
      var editedClothing = {
        'clothingID': this.clothing.clothingID,
        'clothingWorn': this.clothing.clothingWorn,
        'clothingName':this.clothing.clothingName,
        'clothingCost':this.clothing.clothingCost,
        'clothingCategory':this.clothing.clothingCategory
      }
      this.closetService.editClothing(editedClothing);
      this.back();
  }

  /*
  Called every time user changes any one of the input fields. Ensures that
  none of the fields are empty.
  */
  checkSubmit(): void {
    if (this.clothing.clothingName == ''
    || this.clothing.clothingCost == ''
    || this.clothing.clothingCategory == ''
    || this.clothing.clothingWorn == '') {
      this.enableSubmit = false;
      return;
    }
    this.enableSubmit = true;
  }


  ngOnInit() {
  }

}
