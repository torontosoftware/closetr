import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currUrl: string;
  isHidden: boolean;
  authenticationService: AuthenticationService;

  constructor(private router: Router,
              private location: Location,
              private authenticationservice: AuthenticationService) {
      this.authenticationService = authenticationservice;
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

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
