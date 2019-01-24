import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-budget-manage',
  templateUrl: './budget-manage.component.html',
  styleUrls: ['./budget-manage.component.scss']
})
export class BudgetManageComponent implements OnInit {
  availableBudgetSpans: Array<string>;
  allBudgetSpans: Array<string>;
  selectedBudgetSpans: Array<string>;
  selectedBudgetSpan: string;
  budgetSettings: any;

  constructor(private router: Router) {
    this.allBudgetSpans = [
      'select',
      'week',
      'two weeks',
      'month',
      '6 months',
      'year'
    ];

    this.selectedBudgetSpans = [
      'month'
    ];

    this.selectedBudgetSpan = 'select';
  }

  ngOnInit() {
    // take availableBudgetSpans as differences between all date ranges
    // and selected date ranges.
    this.availableBudgetSpans = this.allBudgetSpans.filter(
      budgetSpan => !this.selectedBudgetSpans.includes(budgetSpan)
    );
  }

  addBudgetSpan(budgetSpan: string): void {
    console.log(budgetSpan);
    this.selectedBudgetSpans.push(budgetSpan);
    this.availableBudgetSpans = this.allBudgetSpans.filter(
      budgetSpan => !this.selectedBudgetSpans.includes(budgetSpan)
    );
    this.selectedBudgetSpan = 'select';
  }

  back(): void {
    this.router.navigate(['/spending-manage']);
  }

}
