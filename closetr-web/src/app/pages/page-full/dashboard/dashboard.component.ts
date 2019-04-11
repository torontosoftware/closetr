import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

}
