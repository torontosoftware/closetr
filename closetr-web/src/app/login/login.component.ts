import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  enableLogin: boolean;
  authenticationService: AuthenticationService;

  constructor(private router: Router,
              private authenticationservice: AuthenticationService) {
    this.username = "";
    this.password = "";

    this.authenticationService = authenticationservice;
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
    var loginData = {
      userID: this.username,
      userPassword: this.password
    };

    this.authenticationService.login(loginData).subscribe(
      (data: any) => {
        var canLogin = data.data;
        console.log(canLogin);
        if (canLogin) {
          this.router.navigate(['/dashboard']);
        }
      }, error => { }
    );

  }

}
