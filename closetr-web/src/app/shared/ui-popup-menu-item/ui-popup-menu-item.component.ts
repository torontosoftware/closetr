import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-popup-menu-item',
  templateUrl: './ui-popup-menu-item.component.html',
  styleUrls: ['./ui-popup-menu-item.component.scss']
})
export class UiPopupMenuItemComponent implements OnInit {
  @Input() labelText: string = '';
  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
