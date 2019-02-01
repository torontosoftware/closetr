import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { ClosetService } from '../services/closet.service';

@Component({
  selector: 'app-spending-manage',
  templateUrl: './spending-manage.component.html',
  styleUrls: ['./spending-manage.component.scss']
})
export class SpendingManageComponent implements OnInit {
  closetList: object;
  isDateRange: boolean;
  searchCriteria: any
  availableDateRange: any;
  closetService: ClosetService;

  constructor(private router: Router,
              private closetservice: ClosetService) {

    this.closetService = closetservice;

    this.getAllClothes();

    this.searchCriteria = {
      dateRangeFor: "last month",
      dateFrom: new Date(),
      dateTo: new Date(),
      dateFromFormatted: this.formatDateString(new Date()),
      dateToFormatted: this.formatDateString(new Date())
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
  }

  searchCriteriaChangeHandler(): void {
    if (this.isDateRange) {
      this.searchCriteria.dateFrom = this.formatStringDate(this.searchCriteria.dateFromFormatted);
      this.searchCriteria.dateTo = this.formatStringDate(this.searchCriteria.dateToFormatted);
    } else {
      this.searchCriteria.dateFrom = this.dateRangeForFrom(this.searchCriteria.dateRangeFor);
      this.searchCriteria.dateTo = new Date();
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
    this.closetService.getAllClothes().subscribe(
      (data: any) => {
        this.closetList = data.data;
        console.log(this.closetList);
      }, error => {}
    );
  }

  /*
  format date to string
  */
  formatDateString(date: Date): string {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  }

  /*
  format string to date, from ISO format.
  */
  formatStringDate(date: string): Date {
    var year = parseInt(date.substring(0,4));
    var month = parseInt(date.substring(5,7)) - 1;
    var day = parseInt(date.substring(8,10));
    return (new Date(year, month, day));
  }

  /*
  date range for calculator (to). Calculates from
  date based on dateRangeFor.
  */
  dateRangeForFrom(dateRangeFor): Date {
    let today = new Date();
    switch (dateRangeFor) {
        case 'last week':
        return new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
      case 'last two weeks':
        return new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 14
        );
      case 'last month':
        return new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          today.getDate()
        );
      case 'last 6 months':
        return new Date(
          today.getFullYear(),
          today.getMonth() - 6,
          today.getDate()
        );
      case 'last year':
        return new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
    }
  }
}
