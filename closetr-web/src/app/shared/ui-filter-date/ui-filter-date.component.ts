import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-filter-date',
  templateUrl: './ui-filter-date.component.html',
  styleUrls: ['./ui-filter-date.component.scss']
})
export class UiFilterDateComponent implements OnInit {
  @Input() labelText: string;
  @Input() inputModel: string;
  @Output() inputModelChange: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  changeHandler(inputModel = this.inputModel) {
    this.inputModelChange.emit(inputModel);
  }

}
