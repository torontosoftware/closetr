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
  currentUser: User = new User();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

}
