import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss']
})
export class UiTableComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Input() filter: string = 'none';
  @Input() filterCriteria: any;
  @Input() filterBy: string = '';
  @Input() bindBold: string;
  @Input() bindRegular: string;

  constructor() {

  }

  ngOnInit() {
    for (let item of (this.items)) {
      item.bindBold = item[this.bindBold];
      item.bindRegular = item[this.bindRegular];
    }
  }

}
