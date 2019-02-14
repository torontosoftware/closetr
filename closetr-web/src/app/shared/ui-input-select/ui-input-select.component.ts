import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input-select',
  templateUrl: './ui-input-select.component.html',
  styleUrls: ['./ui-input-select.component.scss']
})
export class UiInputSelectComponent implements OnInit {
  @Input() labelText: string;
  @Input() inputModel: any;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() items: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  modelChange(): void {
    this.inputModelChange.emit(this.inputModel);
  }
}
