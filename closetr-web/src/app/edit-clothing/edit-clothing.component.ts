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

  constructor(private closetservice: ClosetService, private router: Router) {
      this.enableSubmit = false;
      this.closetService = closetservice;
      this.clothing = this.closetService.getClothingForEdit();

      if (!this.clothing) {
        this.router.navigate(['/closet-manage']);
      }

      this.checkSubmit();
  }

  back(): void {
    this.router.navigate(['/closet-manage']);
  }

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

  checkSubmit(): void {
    //console.log(this.clothingName, this.clothingCost, this.clothingCategory);
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
