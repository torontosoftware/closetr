import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-input-add-text',
  templateUrl: './ui-input-add-text.component.html'
})
export class UiInputAddTextComponent implements OnInit {
  @Input() type: string = "text";
  @Input() inputModel: any;
  @Input() placeholder: string;
  @Output() inputModelChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() errorMessage: string;
  @Input() showError: boolean;
  @Input() disabled: boolean;
  @Input() addon: string;

  constructor() { }

  ngOnInit() {
  }

}
