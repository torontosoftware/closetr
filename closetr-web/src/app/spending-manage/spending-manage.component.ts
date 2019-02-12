import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ClosetService } from '../services/closet.service';
import { DateFormatService } from '../services/utils/date-format.service';
import { DateRangeFilterPipe } from '../pipes/date-range-filter.pipe';
import { Clothing } from '../models/clothing.model';

@Component({
  selector: 'app-spending-manage',
  templateUrl: './spending-manage.component.html',
  styleUrls: ['./spending-manage.component.scss']
})
export class SpendingManageComponent implements OnInit {
  closetList: Array<Clothing>;
  isDateRange: boolean;
  searchCriteria: any
  availableDateRange: any;
  closetService: ClosetService;
  dateFormatService: DateFormatService;

  constructor(private router: Router,
              private closetservice: ClosetService,
              private dateformatservice: DateFormatService) {

    this.closetService = closetservice;
    this.dateFormatService = dateformatservice;

    this.getAllClothes();

    this.searchCriteria = {
      property: "clothingPurchaseDate",
      dateRangeFor: "last month",
      dateFrom: new Date(),
      dateTo: new Date(),
      dateFromFormatted: this.dateFormatService.formatDateString(new Date()),
      dateToFormatted: this.dateFormatService.formatDateString(new Date())
    };

    this.isDateRange = false;
    this.searchCriteriaChangeHandler();

    this.availableDateRange = [
      'last week',
      'last two weeks',
      'last month',
      'last 6 months',
      'last year'
    ];

  }

  ngOnInit() {
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
      this.searchCriteria.dateTo = new Date();

      this.searchCriteria.dateFromFormatted = this.dateFormatService.formatDateString(this.searchCriteria.dateFrom);
      this.searchCriteria.dateToFormatted = this.dateFormatService.formatDateString(this.searchCriteria.dateTo);
    }
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }

  /*
  Helper function to get all clothes from database and update local
  closetList.
  */
  getAllClothes(): void {
    this.closetService.getAllClothes('newfides').subscribe(
      (data: any) => {
        this.closetList = data.data;
        for (let i in this.closetList) {
          this.closetList[i] = new Clothing(this.closetList[i]);
        }
      }, error => {}
    );
  }

}
