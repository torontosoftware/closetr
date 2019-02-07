import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Output() closeUserMenuEmit: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {
  }

  close(): void {
    this.closeUserMenuEmit.emit();
  }

  ngOnInit() {
  }

}
