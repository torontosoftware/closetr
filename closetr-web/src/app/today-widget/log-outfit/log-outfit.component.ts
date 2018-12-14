import { Component, OnInit} from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LogOutfitService } from '../../services/log-outfit.service';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss']
})

export class LogOutfitComponent implements OnInit {
  outfitClothingList: any;
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
    this.router.navigate(['/dashboard']);
  }

  removeCard(clothingID: any): void {
    delete this.outfitClothingList[clothingID];
  }

  constructor(private router: Router, private logoutfitservice: LogOutfitService) {
    this.editMode = false;
    this.logOutfitService = logoutfitservice;
    this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();

    //converting outfitClothingList to array
    console.log(this.outfitClothingList);
  }

  ngOnInit() {
  }

}
