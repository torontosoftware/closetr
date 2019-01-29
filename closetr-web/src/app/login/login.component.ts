import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  enableLogin: boolean;

  constructor() {
    this.username = "";
    this.password = "";
  }

  checkEnableLogin(): boolean {
    if (this.username.length == 0 || this.password.length == 0) {
      return false;
    }
    return true;
  }

  ngOnInit() {
  }

}
