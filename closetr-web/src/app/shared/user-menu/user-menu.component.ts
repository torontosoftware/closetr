import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Output() closeUserMenuEmit: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  close(): void {
    this.closeUserMenuEmit.emit();
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  navClick(url: string): void {
    switch (url) {
      case '/profile':
      //case '/settings':
        this.close();
        this.router.navigate([url]);
        break;
      case '/sign-out':
        this.logout();
        this.close();
        break;
    }
  }

  ngOnInit() {
  }

}
