import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent implements OnInit {
  @Input() labelText: string;
  @Input() type: string;
  @Input() rows: number;
  @Input() inputModel: any;
  @Input() placeholder: string;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() errorMessage: string;
  @Input() showError: boolean;
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
  }

  modelChange(inputModel): void {
    this.inputModelChange.emit(inputModel);
  }
}
