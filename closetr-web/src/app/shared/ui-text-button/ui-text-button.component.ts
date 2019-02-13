import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-text-button',
  templateUrl: './ui-text-button.component.html',
  styleUrls: ['./ui-text-button.component.scss']
})
export class UiTextButtonComponent implements OnInit {
  @Input() type: string;
  @Input() labelText: string;
  @Input() buttonLink: string;
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  buttonClick(): void {
    this.click.emit();
  }

}
