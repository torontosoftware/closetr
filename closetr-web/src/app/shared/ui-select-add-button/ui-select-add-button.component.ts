import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-select-add-button',
  templateUrl: './ui-select-add-button.component.html'
})
export class UiSelectAddButtonComponent implements OnInit {
  @Input() addon: string;
  @Input() inputModel: any;
  @Input() placeholder: string;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() errorMessage: string;
  @Input() showError: boolean = false;
  @Input() disabled: boolean = false;
  @Input() addonDisabled: boolean = false;
  @Output() addonClick: EventEmitter<any> = new EventEmitter<any>();
  @Input() items: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
