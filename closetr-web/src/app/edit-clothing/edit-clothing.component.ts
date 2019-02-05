import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../services/closet.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../models/clothing.model';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.scss']
})
export class EditClothingComponent implements OnInit {
  clothing: Clothing;
  closetService: ClosetService;
  clothingCategories: Array<string>;

  constructor(private closetservice: ClosetService,
              private router: Router) {
      this.closetService = closetservice;
      this.clothing = this.closetService.getClothingForEdit();
      this.clothingCategories = Clothing.getClothingCategories();

      if (!this.clothing) {
        this.router.navigate(['/closet-manage']);
      }
  }

  ngOnInit() {
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
    console.log(this.clothing);
    return this.clothing.enableClothingSave();
  }

}
