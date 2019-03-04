import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-filter-select',
  templateUrl: './ui-filter-select.component.html',
  styleUrls: ['./ui-filter-select.component.scss']
})
export class UiFilterSelectComponent implements OnInit {
  @Input() type: string = 'no-icon';
  @Input() className: string;
  @Input() items: Array<any>;
  @Input() labelText: string;
  @Input() inputModel: any;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
    if (!this.inputModel && this.items) {
      this.inputModel = this.items[0];
    }
  }

}
