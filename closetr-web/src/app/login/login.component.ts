import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  enableLogin: boolean;

  constructor(private router: Router) {
    this.username = "";
    this.password = "";
  }

  ngOnInit() {
  }

  checkEnableLogin(): boolean {
    if (this.username.length == 0 || this.password.length == 0) {
      return false;
    }
    return true;
  }

  toSignUp(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.router.navigate(['/dashboard']);
  }

}
