import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input-add-button',
  templateUrl: './ui-input-add-button.component.html'
})
export class UiInputAddButtonComponent implements OnInit {
  @Input() type: string = 'text';
  @Input() addon: string;
  @Input() inputModel: any;
  @Input() placeholder: string;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() errorMessage: string;
  @Input() showError: boolean = false;
  @Input() disabled: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  modelChange(inputModel): void {
    this.inputModelChange.emit(inputModel);
  }
}
