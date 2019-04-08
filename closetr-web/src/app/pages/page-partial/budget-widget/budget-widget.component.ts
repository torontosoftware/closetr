import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { ClosetFactory } from '../../../factories/closet.factory';

@Component({
  selector: 'app-budget-widget',
  templateUrl: './budget-widget.component.html',
  styleUrls: ['./budget-widget.component.scss']
})
export class BudgetWidgetComponent implements OnInit {
  dateOptions: Array<string> = [];
  closetList: Array<Clothing> = [];
  filterCriteria: any = {};
  currentUser: User;

  constructor(
    private closetService: ClosetService,
    private authenticationService: AuthenticationService,
    private dateFormatService: DateFormatService
  ) {
    this.dateOptions = [
      "last week",
      "last month"
    ];
    this.filterCriteria = {
      dateRangeFor: "last month",
      dateFrom: this.dateFormatService.dateRangeForFrom("last month"),
      dateTo: this.dateFormatService.newDate()
    };
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        ClosetFactory.getAllClothes(this);
      }
    );
  }

  updateFilterCriteria(): void {
    this.filterCriteria.dateFrom = this.dateFormatService.dateRangeForFrom(
      this.filterCriteria.dateRangeFor
    );
  }

}
