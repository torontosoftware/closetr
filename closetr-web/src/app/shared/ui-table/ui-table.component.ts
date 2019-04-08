import { Component, OnInit, Input } from '@angular/core';
import { DateRangeFilterPipe } from '../../pipes/date-range-filter.pipe';
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

  ngOnChanges(changes: SimpleChanges): void {
    this.closetList = changes.items.currentValue;
    this.bindItems();
  }

  ngOnInit() {
    this.bindItems();
  }

  bindItems(items: Array<any>): void {
    for (let item of (this.items)) {
      item.bindBold = item[this.bindBold];
      item.bindRegular = item[this.bindRegular];
    }
  }

}
