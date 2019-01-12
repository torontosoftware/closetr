import { Component, OnInit} from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { LogOutfitService } from '../../services/log-outfit.service';
import { ClosetService } from '../../services/closet.service';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss'],
})

export class LogOutfitComponent implements OnInit {
  outfitClothingList: any;
  logOutfitService: LogOutfitService;
  closetList: any;
  closetService: ClosetService;
  editMode : boolean;
  searchText: String;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
    this.logOutfitService.setAllOutfitClothes(this.outfitClothingList);
  }

  search(): void {
  }

  addSearchReault(clothing: any): void {
    this.logOutfitService.addOutfitClothing(clothing);
    this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }

  removeCard(clothingID: any): void {
    delete this.outfitClothingList[clothingID];
  }

  constructor(private router: Router,
              private logoutfitservice: LogOutfitService,
              private closetservice: ClosetService) {
    this.editMode = false;
    this.logOutfitService = logoutfitservice;
    this.closetService = closetservice;
    this.closetList = this.closetService.getAllClothes();
    this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();

    //converting outfitClothingList to array
    console.log(this.outfitClothingList);
  }

  ngOnInit() {
  }

}
