import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  enableLogin: boolean;
  showLoginError: boolean;
  show : boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.username = "";
    this.password = "";
    this.enableLogin = false;
    this.showLoginError = false;
    this.show = false;
  }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      console.log("i went to the dashboard.");
      this.router.navigate(['/dashboard']);
    } else {
      console.log("i did not go to the dashboard.");
      this.show = true;
    }
  }

  checkEnableLogin(): void {
    if (this.username.length == 0 || this.password.length == 0) {
      this.enableLogin = false;
    } else {
      this.enableLogin = true;
    }
  }

  loginChangeHandler(): void {
    this.showLoginError = false;
    this.checkEnableLogin();
  }

  toSignUp(): void {
    this.router.navigate(['/register']);
  }

  login(): void {
    this.showLoginError = false;
    var loginData = {
      userID: this.username,
      userPassword: this.password
    };

    this.authenticationService.login(loginData)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/dashboard']);
          } else {
            this.showLoginError = true;
          }
        },
        error => { }
      );

  }

}
