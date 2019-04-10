import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoutesService } from '../../../services/routes.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-closet-manage',
  templateUrl: './closet-manage.component.html',
  styleUrls: ['./closet-manage.component.scss'],
})

export class ClosetManageComponent implements OnInit {
  closetList: Array<Clothing>;
  editMode : boolean;
  searchText: String;
  currentUserSubscription: Subscription;
  currentUser: User;
  filterOptions: Array<string>;
  sortOptions: Array<string>;

  constructor(private closetService: ClosetService,
              private router: Router,
              private routesService: RoutesService,
              private authenticationService: AuthenticationService) {
    this.editMode = false;
    ({
      filterOptions: this.filterOptions,
      sortOptions: this.sortOptions
    } = this.closetService);
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    )
  }

  navTo = (): void => this.routesService.setPrevUrl(this.router.url);

  toggleEditMode = (): boolean => this.editMode = !this.editMode;

  save = (): boolean => this.toggleEditMode();

  /*
  Remove clothing item.
  */
  removeClothing = (clothingID: any): Observable<any> =>
    ClosetFactory.removeClothing(this, clothingID);

  getAllClothes = (): Observable<any> => ClosetFactory.getAllClothes(this);
}
