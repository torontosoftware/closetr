import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currUrl: string;
  isHidden: boolean;

  constructor(private router: Router,
              private location: Location) {

      router.events.subscribe((val) => {
        this.currUrl = this.location.path();
        this.checkHidden();
      });
  }

  checkHidden(): void {
    this.isHidden = false;
    if (this.currUrl == '/login'
        || this.currUrl == '/register'
      ) {
      this.isHidden = true;
    }
  }

  ngOnInit() {
  }

}
