import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  enableLogin: boolean = false;
  showLoginError: boolean = false;
  show : boolean = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.show = true;
    (this.authenticationService.currentUserValue
      && this.router.navigate(['/dashboard']));
  }

  checkEnableLogin = (): boolean =>
    this.enableLogin = !(this.username.length == 0 || this.password.length == 0);

  loginChangeHandler = (): void => {
    this.showLoginError = false;
    this.checkEnableLogin();
  }

  toSignUp = (): Promise<boolean> => this.router.navigate(['/register']);

  login(): void {
    this.showLoginError = false;
    let loginData = {
      userID: this.username,
      userPassword: this.password
    };
    this.authenticationService.login(loginData)
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/dashboard']);
          } else {
            this.showLoginError = true;
          }
        }
      );
  }

}
