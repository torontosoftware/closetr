import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ui-edit-button',
  templateUrl: './ui-edit-button.component.html',
  styleUrls: ['./ui-edit-button.component.scss']
})
export class UiEditButtonComponent implements OnInit {
  @Input() type: string = 'button';
  @Input() buttonLink: string = '/';

  constructor(private router: Router) {}

  ngOnInit() {
  }

  buttonClick(): void {
    if (this.buttonLink && this.type == 'link') {
      this.router.navigate([this.buttonLink]);
    }
  }
}