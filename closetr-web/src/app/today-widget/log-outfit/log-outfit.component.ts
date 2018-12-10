import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-outfit',
  templateUrl: './log-outfit.component.html',
  styleUrls: ['./log-outfit.component.scss']
})

export class LogOutfitComponent implements OnInit {

  closetList: Array<any>;
  editMode : boolean;

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  removeCard(clothing: any): void {
    console.log("from the parent", clothing);
    var index = this.closetList.indexOf(clothing);
    this.closetList.splice(index, 1);
    console.log(index);
  }

  constructor() {
    this.editMode = false;
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
