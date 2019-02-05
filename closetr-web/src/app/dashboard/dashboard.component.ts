import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  
  constructor(private authenticationService: AuthenticationService) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
      }
    )
  }

  ngOnInit() {
  }

}
