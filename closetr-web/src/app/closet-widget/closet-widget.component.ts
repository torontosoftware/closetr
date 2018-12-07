import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closet-widget',
  templateUrl: './closet-widget.component.html',
  styleUrls: ['./closet-widget.component.scss']
})
export class ClosetWidgetComponent implements OnInit {
  closetList: object;

  constructor() {
    this.closetList = [
      {cost:'$45',name:'Aritzia TShirt', worn: 45},
      {cost: '$35', name:'Zara Turtleneck TShirt', worn: 32},
      {cost: '$99', name:'Aritzia Sweater', worn: 23},
      {cost:'$35',name:'Uniqlo Palazzo Pants', worn: 17},
      {cost:'$5',name:'Uniqlo Socks', worn: 16},
      {cost:'$35',name:'Zara Cocoon Cardigan', worn: 15}
    ];
    console.log(this.closetList);
  }

  ngOnInit() {
  }

}
