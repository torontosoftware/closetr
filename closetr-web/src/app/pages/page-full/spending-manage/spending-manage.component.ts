import { Component, OnInit } from '@angular/core';
import { ClosetService } from '../../../services/closet.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { DateFormatService } from '../../../services/utils/date-format.service';
import { DateRangeFilterPipe } from '../../../pipes/date-range-filter.pipe';
import { Clothing } from '../../../models/clothing.model';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spending-manage',
  templateUrl: './spending-manage.component.html',
  styleUrls: ['./spending-manage.component.scss']
})
export class SpendingManageComponent implements OnInit {
  closetList: Array<Clothing>;
  isDateRange: boolean;
  searchCriteria: any;
  filterCriteria: any;
  availableDateRange: any;
  currentUser: User;

  constructor(private closetService: ClosetService,
              private dateFormatService: DateFormatService,
              private authenticationService: AuthenticationService) {

    this.searchCriteria = {
      property: "clothingPurchaseDate",
      dateRangeFor: "last month",
      dateFrom: this.dateFormatService.newDate(),
      dateTo: this.dateFormatService.newDate(),
      dateFromFormatted: this.dateFormatService.formatDateString(new Date()),
      dateToFormatted: this.dateFormatService.formatDateString(new Date())
    };

    this.isDateRange = false;

    this.availableDateRange = [
      'last week',
      'last two weeks',
      'last month',
      'last 6 months',
      'last year'
    ];

  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.getAllClothes();
      }
    )
    this.searchCriteriaChangeHandler();
  }

  searchCriteriaChangeHandler(): void {
    if (this.isDateRange) {
      // choosing date range: turn string format to date object.
      this.searchCriteria.dateFrom = this.dateFormatService.formatStringDate(this.searchCriteria.dateFromFormatted);
      this.searchCriteria.dateTo = this.dateFormatService.formatStringDate(this.searchCriteria.dateToFormatted);
    } else {
      // choosing date range up to today:
      // set date objects, then set string format from date objects.
      this.searchCriteria.dateFrom = this.dateFormatService.dateRangeForFrom(this.searchCriteria.dateRangeFor);
      this.searchCriteria.dateTo = this.dateFormatService.newDate();

      this.searchCriteria.dateFromFormatted = this.dateFormatService.formatDateString(this.searchCriteria.dateFrom);
      this.searchCriteria.dateToFormatted = this.dateFormatService.formatDateString(this.searchCriteria.dateTo);

    }
    this.updateFilterCriteria();
  }

  updateFilterCriteria(): void {
    this.filterCriteria = {
      dateFrom: this.searchCriteria.dateFrom,
      dateTo: this.searchCriteria.dateTo
    };
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

}
