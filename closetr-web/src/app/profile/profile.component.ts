import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  editMode: boolean;
  currentUserSubscription: Subscription;
  currentUser: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.editMode = false;
    console.log("this.currentUser f");
    //this.currentUser = 'new User()';
  }

  ngOnInit() {
    console.log("this.currentUser");
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        console.log(this.currentUser);
      }
    )
  }

  checkSubmit(): boolean {
    return true;
  }

  /*
  Go back to the previous page.
  */
  back(): void {
    this.router.navigate(['/dashboard']);
  }

  /*
  Toggle edit mode
  */
  toggleEditMode(): void {
    console.log(this.currentUser);
    this.editMode = !this.editMode;
  }


}
