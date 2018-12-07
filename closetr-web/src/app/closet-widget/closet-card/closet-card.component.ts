import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-closet-card',
  templateUrl: './closet-card.component.html',
  styleUrls: ['./closet-card.component.scss']
})
export class ClosetCardComponent implements OnInit {

  @Input() clothing: object;

  constructor() {
  }

  ngOnInit() {
  }

}
