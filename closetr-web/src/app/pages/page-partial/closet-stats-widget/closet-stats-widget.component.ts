import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closet-stats-widget',
  templateUrl: './closet-stats-widget.component.html',
  styleUrls: ['./closet-stats-widget.component.scss']
})
export class ClosetStatsWidgetComponent implements OnInit {
  dateOptions: Array<string>;
  constructor() {
    this.dateOptions = [
      "last week",
      "last month"
    ];
  }

  ngOnInit() {
  }

}
