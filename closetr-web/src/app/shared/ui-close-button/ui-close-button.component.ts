import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-close-button',
  templateUrl: './ui-close-button.component.html',
  styleUrls: ['./ui-close-button.component.scss']
})
export class UiCloseButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() buttonLink: string = '/';
  @Input() hidden: boolean = false;
  @Input() size: string = 'lg';
  constructor() { }

  ngOnInit() {
  }

}
