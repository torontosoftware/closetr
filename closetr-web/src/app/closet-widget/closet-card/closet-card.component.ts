import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-closet-card',
  templateUrl: './closet-card.component.html',
  styleUrls: ['./closet-card.component.scss']
})
export class ClosetCardComponent implements OnInit {

  @Input() clothing: Object;
  @Input() editMode: boolean;
  @Output() removeCardEmit: EventEmitter<Object> = new EventEmitter<Object>();

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  removeCard(clothing: Object): void {
    console.log("want to remove this:", clothing);
    this.removeCardEmit.emit(clothing);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
