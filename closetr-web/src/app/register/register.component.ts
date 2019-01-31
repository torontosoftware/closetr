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

  userService: UserService;

  constructor(private router: Router
              private userservice: UserService) {
    this.name = "";
    this.username = "";
    this.password = "";
    this.passwordConfirm = "";

    this.userService = userservice;
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

  checkError(field): boolean {
    switch(field) {
      case 'passwordConfirm':
        if (this.password.length != 0
            && this.passwordConfirm.length != 0
            && this.password != this.passwordConfirm) {
              return true;
            }
        return false;
        break;
      case 'password':
        if (this.password.length == 0
            && this.passwordConfirm.length != 0) {
              return true;
            }
        return false;
        break;
      case 'username':
        if ((this.password.length != 0
            || this.passwordConfirm.length != 0)
            && this.username.length == 0) {
              return true;
            }
        return false;
        break;
      case 'name':
        if ((this.username.length != 0
             || this.password.length != 0
             || this.passwordConfirm.length != 0)
            && (this.name.length == 0)) {
              return true;
            }
        return false;
        break;
    }
  }

  toSignIn(): void {
    this.router.navigate(['/login']);
  }

  register(): void {
    var params = {
      userName: this.name,
      userID: this.username,
      userPassword: this.password
    }
    this.userService.register(params).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      }, error => {}
    );
  }

  ngOnInit() {
  }

}
