import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  editMode: boolean = false;
  currentUser: User = new User();

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  checkSubmit = (): boolean => true;

  /*
  Saves updated user into database.
  */
  save(): void {
    this.userService.update(new User(this.currentUser)).subscribe(
      (user: any) => {
        this.currentUser.userName = user.userName;
        this.currentUser.userDesc = user.userDesc;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.toggleEditMode();
      }
    );
  }

  /*
  Toggle edit mode
  */
  toggleEditMode = (): boolean => this.editMode = !this.editMode;

}
