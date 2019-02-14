import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ui-text-button',
  templateUrl: './ui-text-button.component.html',
  styleUrls: ['./ui-text-button.component.scss']
})
export class UiTextButtonComponent implements OnInit {
  @Input() type: string = 'full-width';
  @Input() labelText: string;
  @Input() buttonLink: string;
  @Input() disabled: boolean = false;
  @Input() hidden: boolean = false;
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {}

  ngOnInit() {
  }

  buttonClick(): void {
    this.click.emit();
    if (this.buttonLink && this.type == 'full-width') {
      this.router.navigate([this.buttonLink]);
    }
  }

}
