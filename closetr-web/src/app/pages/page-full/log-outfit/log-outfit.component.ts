import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LogOutfitService } from '../../../services/log-outfit.service';
import { ClosetService } from '../../../services/closet.service';
import { RoutesService } from '../../../services/routes.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { ClosetFactory } from '../../../factories/closet.factory';

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
  params: any;

  constructor(private router: Router,
              private logOutfitService: LogOutfitService,
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
    if (this.currentUser) {
      this.params = {
        userID: this.currentUser.id,
        date: this.dateFormatService.formatDateString(new Date())
      };
    }
    this.getAllOutfitClothes(this.params);
  }

  toggleEditMode = (): void => this.editMode = !this.editMode;

  save = (): void => this.toggleEditMode();

  navTo = (): void => {
    this.routesService.setPrevUrl('/log-outfit');
    this.router.navigate(['/add-clothing']);
  }

  /*
  Checks if the given clothing's ID is contained in the current outfit
  clothing list. Returns true if it is present.
  */
  outfitClothingListContains(clothing: any): boolean {
    let clothingID = clothing.clothingID;
    let contains = false;
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
        userID: this.currentUser.id,
        date: this.dateFormatService.formatDateString(new Date())
      };
      this.addOutfitClothing(params);
      this.getAllOutfitClothes(this.params);
    }
  }

  removeCard = (outfitEntry: any): Observable<any> =>
    this.deleteOutfitClothing(outfitEntry.outfitEntryID);

  deleteOutfitClothing = (outfitEntryID: any): Observable<any> =>
    this.subscribeAndGetAllOutfitClothes(
      this.logOutfitService.deleteOutfitClothing(outfitEntryID)
    );

  addOutfitClothing = (params: any): Observable<any> =>
    this.subscribeAndGetAllOutfitClothes(
      this.logOutfitService.addOutfitClothing(params)
    );

  getAllOutfitClothes = (params: any): Observable<any> =>
    this.logOutfitService.getAllOutfitClothes(params).subscribe(
      (data: any) => this.outfitClothingList = data
    );

  getAllClothes = (): Observable<any> => ClosetFactory.getAllClothes(this);

  subscribeAndGetAllOutfitClothes = (apiCall: any): Observable<any> =>
    apiCall.subscribe((data: any) => this.getAllOutfitClothes(this.params));

}
