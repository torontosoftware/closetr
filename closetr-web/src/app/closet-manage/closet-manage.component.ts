import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClosetService } from '../services/closet.service';

@Component({
  selector: 'app-closet-manage',
  templateUrl: './closet-manage.component.html',
  styleUrls: ['./closet-manage.component.scss']
})

export class ClosetManageComponent implements OnInit {
  closetList: any;
  closetService: ClosetService;
  editMode : boolean;
  closetListDp: any;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
    this.closetService.setAllClothes(this.closetList);
  }

  back(): void {
    this._location.back();
  }

  removeCard(clothing: any): void {
    delete this.closetList[clothing.clothingID];
  }

  constructor(private _location: Location, private closetservice: ClosetService) {
    this.editMode = false;
    this.closetService = closetservice;
    this.closetList = this.closetService.getAllClothes();

    this.closetListDp = [];
    for(let clothingID in this.closetList) {
        this.closetListDp.push(this.closetList[clothingID]);
    }

    console.log(this.closetList);
  }

  ngOnInit() {
  }

}
