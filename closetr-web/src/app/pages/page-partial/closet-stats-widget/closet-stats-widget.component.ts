import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closet-stats-widget',
  templateUrl: './closet-stats-widget.component.html'
})
export class ClosetStatsWidgetComponent implements OnInit {
  dateOptions: Array<string>;
  bestValueItems: Array<any>;
  mostWornItems: Array<any>;

  constructor() {
    this.dateOptions = [
      "last week",
      "last month"
    ];

    this.bestValueItems = [
      {clothingName: 'Turtleneck Sweater', clothingCostPerWear: 2.22},
      {clothingName: 'Blanket Scarf', clothingCostPerWear: 3.56},
      {clothingName: 'Stowe Backpack', clothingCostPerWear: 5.70},
      {clothingName: 'Fluffy Sweater', clothingCostPerWear: 5.78}
    ];

    this.mostWornItems = [
      {clothingName: 'Striped Socks', clothingWorn: 78},
      {clothingName: 'Mom Jeans', clothingWorn: 76},
      {clothingName: 'Ringer TShirt', clothingWorn: 64},
      {clothingName: 'Puffer Jacket', clothingWorn: 40}
    ];

  }

  ngOnInit() {
  }

}
