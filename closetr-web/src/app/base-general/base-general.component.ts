import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-base-general',
  template : '',
  styleUrls: ['./base-general.component.scss'],
  animations: [
  trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate(350)
      ]),
      transition(':leave', [
        group([
          animate('0.2s ease', style({
            transform: 'translate(150px,25px)'
          })),
          animate('0.5s 0.2s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class BaseGeneralComponent implements OnInit, OnDestroy {
  exitClass: boolean
  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
