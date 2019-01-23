import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-budget-manage',
  templateUrl: './budget-manage.component.html',
  styleUrls: ['./budget-manage.component.scss']
})
export class BudgetManageComponent implements OnInit {
  availableDateRange: Array<string>;
  budgetSettings: any;

  constructor(private router: Router) {
    this.availableDateRange = [
      'week',
      'two weeks',
      'month',
      '6 months',
      'year'
    ];
  }

  back(): void {
    this.router.navigate(['/spending-manage']);
  }

  ngOnInit() {
  }

}
