import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Clothing } from '../../../models/clothing.model';

@Component({
  selector: 'app-edit-clothing',
  templateUrl: './edit-clothing.component.html',
  styleUrls: ['./edit-clothing.component.scss']
})
export class EditClothingComponent implements OnInit {
  clothing: Clothing = new Clothing();

  constructor(private closetService: ClosetService,
              private router: Router) { }

  ngOnInit() {
    let clothingForEdit;
    if (clothingForEdit = this.closetService.getClothingForEdit()) {
      this.clothing = clothingForEdit;
    } else {
      this.router.navigate(['/closet-manage']);
    }
  }

  /*
  Save the edit clothing item via POST request (future). On successful update of
  clothing item, navigate back to the previous page.
  */
  save = (): Observable<any> => this.closetService.editClothing(this.clothing)
    .subscribe((data: any) => this.back());

  /*
  Go back to the previous page.
  */
  back = (): Promise<boolean> => this.router.navigate(['/closet-manage']);

}
