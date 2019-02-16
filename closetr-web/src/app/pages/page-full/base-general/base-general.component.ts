import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, group } from '@angular/animations';

@Component({
  selector: 'app-base-general',
  template : '<ng-content></ng-content>',
  styleUrls: ['./base-general.component.scss']
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
