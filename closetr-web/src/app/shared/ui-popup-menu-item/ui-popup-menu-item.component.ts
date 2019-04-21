import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-popup-menu-item',
  templateUrl: './ui-popup-menu-item.component.html'
})
export class UiPopupMenuItemComponent implements OnInit {
  @Input() labelText: string = '';
  constructor() { }

  ngOnInit() {
  }

}
