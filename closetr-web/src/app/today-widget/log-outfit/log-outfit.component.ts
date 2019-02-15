import { Component, OnInit} from '@angular/core';
import { LogOutfitService } from '../../services/log-outfit.service';
import { ClosetService } from '../../services/closet.service';
import { AuthenticationService } from '../../services/authentication.service';
import { SearchFilterPipe } from '../../pipes/search-filter.pipe';
import { Clothing } from '../../models/clothing.model';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss'],
})

export class LogOutfitComponent implements OnInit {
  outfitClothingList: any;
  closetList: any;
  editMode : boolean;
  searchText: String;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(private logOutfitService: LogOutfitService,
              private closetService: ClosetService,
              private authenticationService: AuthenticationService) {
    this.editMode = false;
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    )
    this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
    this.logOutfitService.setAllOutfitClothes(this.outfitClothingList);
  }

  search(): void {
  }

  /*
  Checks if the given clothing's ID is contained in the current outfit
  clothing list. Returns true if it is present.
  */
  outfitClothingListContains(clothing: any): boolean {
    var clothingID = clothing.clothingID;
    var contains = false;
    for (let i in this.outfitClothingList) {
      if (this.outfitClothingList[i].clothingID == clothingID) {
        contains = true;
        break;
      }
    }
    return contains;
  }

  /*
  Adds clothing selected from search results to the outfit clothing list.
  */
  addSearchResult(clothing: any): void {
    // check if clothing to be added is already in outfit clothing list
    if (!this.outfitClothingListContains(clothing)) {
      this.logOutfitService.addOutfitClothing(clothing, 'search');
      this.outfitClothingList = this.logOutfitService.getAllOutfitClothes();
    }
  }

  removeCard(clothingID: any): void {
    delete this.outfitClothingList[clothingID];
  }

  getAllClothes(): void {
    this.closetService.getAllClothes(this.currentUser).subscribe(
      (data: any) => {
        this.closetList = data.data;
        for (let i in this.closetList) {
          this.closetList[i] = new Clothing(this.closetList[i]);
        }
      },
      error => { }
    );
  }

}
