import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-icon-sized',
  templateUrl: './ui-icon-sized.component.html'
})
export class UiIconSizedComponent implements OnInit {
  @Input() className: string;
  @Input() size: string = 'lg';
  
  constructor() { }

  ngOnInit() {
  }

}
