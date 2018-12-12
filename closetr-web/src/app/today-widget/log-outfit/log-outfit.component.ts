import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { LogOutfitService } from '../../services/log-outfit.service';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss']
})

export class LogOutfitComponent implements OnInit {
  outfitClothingList: Array<any>;
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
    console.log("from the parent", clothing);
    var index = this.outfitClothingList.indexOf(clothing);
    this.outfitClothingList.splice(index, 1);
    console.log(index);
  }

  constructor(private _location: Location, private logoutfitservice: LogOutfitService) {
    this.editMode = false;
    this.logOutfitService = logoutfitservice;
    this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();
    console.log(this.outfitClothingList);
  }

  ngOnInit() {
  }

}
