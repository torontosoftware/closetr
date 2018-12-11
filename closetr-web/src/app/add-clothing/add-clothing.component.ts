import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-clothing',
  templateUrl: './add-clothing.component.html',
  styleUrls: ['./add-clothing.component.scss']
})
export class AddClothingComponent implements OnInit {

  back(): void {
    this._location.back();
  }

  constructor(private _location: Location) { }

  ngOnInit() {
  }

}
