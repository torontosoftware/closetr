import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.name = "";
    this.username = "";
    this.password = "";
    this.passwordConfirm = "";
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

  ngOnInit() {
  }

}
