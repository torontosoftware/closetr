import { Component, OnInit} from '@angular/core';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { ClosetService } from '../../../services/closet.service';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { DateFormatService } from '../../../services/utils/date-format.service';

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
              private authenticationService: AuthenticationService,
              private routesService: RoutesService,
              private dateFormatService: DateFormatService) {
    this.editMode = false;
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    )
    const params = {
      userID: this.currentUser.userID,
      date: this.dateFormatService.formatDateString(new Date())
    };
    console.log("calling get outfit clothes");
    this.getAllOutfitClothes(params);
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
    this.logOutfitService.setAllOutfitClothes(this.outfitClothingList);
  }

  navTo(): void {
    console.log(this);
    this.routesService.setPrevUrl('/log-outfit');
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
      if (this.outfitClothingList[i].clothingID === clothingID) {
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
      const params = {
        clothingID: clothing.clothingID,
        userID: this.currentUser.userID,
        date: this.dateFormatService.formatDateString(new Date())
      };
      this.logOutfitService.addOutfitClothing(params, 'search');
      this.logOutfitService.getAllOutfitClothes(params);
    }
  }

  removeCard(clothingID: any): void {
    delete this.outfitClothingList[clothingID];
  }

  getAllClothes(): void {
    this.closetService.getAllClothes(this.currentUser).subscribe(
      (data: any) => {
        this.closetList = data.data;
        for (let clothing of this.closetList) {
          clothing = new Clothing(clothing);
        }
      },
      error => { }
    );
  }

  getAllOutfitClothes(params: any): void {
    console.log("calling get outfit clothes in the body");
    this.logOutfitService.getAllOutfitClothes(params).subscribe(
      (data: any) => {
        console.log("get all outfit clothes result",data);
        this.outfitClothingList = data.data;
        for (let clothing of this.outfitClothingList) {
          clothing = new Clothing(clothing);
        };
        console.log(this.outfitClothingList);
      },
      err => {
        console.log("error on get outfit clothes", err);
      }
    );
  }

}
