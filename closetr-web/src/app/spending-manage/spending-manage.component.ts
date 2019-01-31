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
  searchCriteria: object;
  availableDateRange: any;
  closetService: ClosetService;

  constructor(private router: Router,
              private closetservice: ClosetService) {

    this.closetService = closetservice;

    this.getAllClothes();

    this.searchCriteria = {
      dateRange: "last month",
      dateFrom: new Date(),
      dateTo: new Date()
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

  searchCriteriaChange(): void {
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
      }, error => {}
    );
  }

}
