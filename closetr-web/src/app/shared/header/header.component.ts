import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  currUrl: string;
  isHidden: boolean;
  showMenu: boolean;

  constructor(private router: Router,
              private location: Location) {
      router.events.subscribe((val) => {
        this.currUrl = this.location.path();
        this.checkHidden();
      });
      this.showMenu = false;
  }

  checkHidden(): void {
    this.isHidden = false;
    if (this.currUrl == '/login'
        || this.currUrl == '/register'
      ) {
      this.isHidden = true;
    }
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  ngOnInit() {
  }

}
