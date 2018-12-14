import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { LogOutfitService } from '../../services/log-outfit.service';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss']
})

export class LogOutfitComponent implements OnInit {
  outfitClothingList: any;
  outfitClothingListDp: any;
  logOutfitService: LogOutfitService;
  editMode : boolean;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
    this.logOutfitService.setAllOutfitClothes(this.outfitClothingList);
  }

  back(): void {
    this._location.back();
  }

  removeCard(clothing: any): void {
    delete this.outfitClothingList[clothing.clothingID];
  }

  constructor(private _location: Location, private logoutfitservice: LogOutfitService) {
    this.editMode = false;
    this.logOutfitService = logoutfitservice;
    this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();

    //converting outfitClothingList to array
    this.outfitClothingListDp = [];
    for(let clothingID in this.outfitClothingList) {
        this.outfitClothingListDp.push(this.outfitClothingList[clothingID]);
    }

    console.log(this.outfitClothingList);
  }

  ngOnInit() {
  }

}
