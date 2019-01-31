import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-widget',
  templateUrl: './budget-widget.component.html',
  styleUrls: ['./budget-widget.component.scss']
})
export class BudgetWidgetComponent implements OnInit {
  purchaseList: object;

  constructor() {
    this.purchaseList = [
      {price:'$15',name:'Aritzia TShirt'},
      {price: '$399', name:'The Stowe Bag'},
      {price: '13', name:'UO Blouse'},
      {price:'$35',name:'Uniqlo Sweater'}
    ];
  }

  ngOnInit() {
  }

}
