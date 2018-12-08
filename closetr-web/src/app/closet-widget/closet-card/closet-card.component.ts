import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-closet-card',
  templateUrl: './closet-card.component.html',
  styleUrls: ['./closet-card.component.scss']
})
export class ClosetCardComponent implements OnInit {

  @Input() clothing: object;
  @Input() editMode: boolean;
  @Output() removeCardEmit: EventEmitter<String> = new EventEmitter<String>();

  editMode : boolean;

  toggleEditMode(): void {
    editMode = !editMode;
  }

  removeCard(clothing: clothing): void {
    console.log("want to remove this:", clothing);
    this.removeCardEmit.emit(clothing);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
