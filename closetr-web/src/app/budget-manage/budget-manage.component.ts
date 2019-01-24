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
  selectedBudgetSpans: any;
  selectedBudgetSpansArr: Array<string>;
  selectedBudgetSpan: string;
  budgetSettings: any;
  editMode: boolean;

  constructor(private router: Router) {
    this.allBudgetSpans = [
      'select',
      'week',
      'two weeks',
      'month',
      '6 months',
      'year'
    ];

    this.selectedBudgetSpansArr = [
      'month'
    ];

    this.selectedBudgetSpans = {
      'month': {
        'amount': 200,
        'rollover': false
      }
    }

    this.selectedBudgetSpan = 'select';
    this.editMode = false;
  }

  ngOnInit() {
    // take availableBudgetSpans as differences between all date ranges
    // and selected date ranges.
    this.availableBudgetSpans = this.allBudgetSpans.filter(
      budgetSpan => !this.selectedBudgetSpansArr.includes(budgetSpan)
    );
  }

  addBudgetSpan(budgetSpan: string): void {
    console.log(budgetSpan);
    this.selectedBudgetSpansArr.push(budgetSpan);

    this.availableBudgetSpans = this.allBudgetSpans.filter(
      budgetSpan => !this.selectedBudgetSpansArr.includes(budgetSpan)
    );

    this.selectedBudgetSpans[budgetSpan] = {
      'amount': 100,
      'rollover': false
    }

    this.selectedBudgetSpan = 'select';
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  back(): void {
    this.router.navigate(['/spending-manage']);
  }

}
