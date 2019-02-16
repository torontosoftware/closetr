import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-today-widget',
  templateUrl: './today-widget.component.html',
  styleUrls: ['./today-widget.component.scss']
})
export class TodayWidgetComponent implements OnInit {
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
