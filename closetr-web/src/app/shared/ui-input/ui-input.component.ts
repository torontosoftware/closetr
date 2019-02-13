import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss']
})
export class UiInputComponent implements OnInit {
  @Input() labelText: string;
  @Input() inputModel: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Output() inputModelChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() removeCardEmit: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }

  modelChange(): void {
    this.inputModelChange.emit(this.inputModel);
  }
}
