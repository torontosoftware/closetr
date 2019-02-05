import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  passwordConfirm: string;
  enableLogin: boolean;
  userExists: boolean;
  errorMessage: any;
  userService: UserService;

  constructor(private router: Router,
              private userservice: UserService) {
    this.name = "";
    this.username = "";
    this.password = "";
    this.passwordConfirm = "";
    this.userExists = false;
    this.userService = userservice;

    this.errorMessage = {
      'name':'',
      'username':'',
      'password':'',
      'passwordConfirm':''
    }
  }

  checkEnableRegister(): boolean {
    if (this.name.length == 0
        || this.username.length == 0
        || this.password.length == 0
        || this.passwordConfirm.length == 0
        || (this.password != this.passwordConfirm)) {
      return false;
    }
    return true;
  }

  registerChangeHandler(): void {
    this.userExists = false;
  }

  checkError(field): boolean {
    switch(field) {
      case 'passwordConfirm':
        if (this.password.length != 0
            && this.passwordConfirm.length != 0
            && this.password != this.passwordConfirm) {
              this.errorMessage.passwordConfirm = 'passwords are not the same.';
              return true;
            }
        this.errorMessage.passwordConfirm = '';
        return false;
        break;
      case 'password':
        if (this.password.length == 0
            && this.passwordConfirm.length != 0) {
              this.errorMessage.password = 'password is required.'
              return true;
            }
        this.errorMessage.password = '';
        return false;
        break;
      case 'username':
        if ((this.password.length != 0
            || this.passwordConfirm.length != 0)
            && this.username.length == 0) {
              this.errorMessage.username = 'username is required.'
              return true;
            }
        if (this.userExists) {
          this.errorMessage.username = 'user with that username already exists.';
          return true;
        }
        this.errorMessage.username = '';
        return false;
        break;
      case 'name':
        if ((this.username.length != 0
             || this.password.length != 0
             || this.passwordConfirm.length != 0)
            && (this.name.length == 0)) {
              this.errorMessage.name = 'name is required.';
              return true;
            }
        this.errorMessage.name = '';
        return false;
        break;
    }
  }

  toSignIn(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    this.userExists = false;
    var params = {
      userName: this.name,
      userID: this.username,
      userPassword: this.password
    }
    this.userService.register(params).subscribe(
      (data: any) => {
        var isRegistered = data.auth;
        if (isRegistered) {
          this.router.navigate(['/dashboard']);
        } else {
          this.userExists = true;
        }
      }, error => {}
    );
  }

  ngOnInit() {
  }

}
