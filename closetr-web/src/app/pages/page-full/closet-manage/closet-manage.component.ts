import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RoutesService } from '../../../services/routes.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { SearchFilterPipe } from '../../../pipes/search-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

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

    this.filterOptions = [
      "no filter",
      "exclude Aritzia items",
      "sweaters only",
      "pants and sweaters only",
      "pants only"
    ];

    this.sortOptions = [
      "cost ascending",
      "cost descending",
      "most recently purchased",
      "least recently purchased",
      "most worn"
    ];
  }

  ngOnInit() {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    )
  }

  navTo(): void {
    this.routesService.setPrevUrl(this.router.url);
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(): void {
    this.toggleEditMode();
  }

  /*
  Helper function to get all clothes from database and update local
  closetList.
  */
  getAllClothes(): void {
    this.closetService.getAllClothes(this.currentUser).subscribe(
      (data: any) => {
        this.closetList = data.data;
        for (let i in this.closetList) {
          this.closetList[i] = new Clothing(this.closetList[i]);
        }
      }, error => {}
    );
  }

  /*
  Remove clothing item.
  */
  removeClothing(clothingID: any): void {
    this.closetService.removeClothing(clothingID).subscribe(
      (data: any) => {
        this.getAllClothes();
      }, error => {}
    );
  }
}
