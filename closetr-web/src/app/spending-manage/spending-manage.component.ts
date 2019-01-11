import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-spending-manage',
  templateUrl: './spending-manage.component.html',
  styleUrls: ['./spending-manage.component.scss']
})
export class SpendingManageComponent implements OnInit {
  purchaseList: object;
  isDateRange: boolean;

  constructor(private router: Router) {
    this.purchaseList = [
      {price:'$15',name:'Aritzia TShirt'},
      {price: '$399', name:'The Stowe Bag'},
      {price: '13', name:'UO Blouse'},
      {price:'$35',name:'Uniqlo Sweater'},
      {price:'$5',name:'Uniqlo Socks'},
      {price:'$15',name:'Aritzia TShirt'},
      {price:'$35',name:'Uniqlo Sweater'}
    ];
    console.log(this.purchaseList);
  }

  back(): void {
    this.router.navigate(['/dashboard']);
  }
  
  ngOnInit() {
  }

}
