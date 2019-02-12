import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  editMode: boolean;

  constructor(private router: Router) {
    this.user = {
      'userID':'fideslinga',
      'userName': 'Fides Linga',
      'userPassword': 'password',
      'userDesc': 'A girl that is addicted to clothes.'
    };
    this.editMode = false;
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
    this.editMode = !this.editMode;
  }

  ngOnInit() {
  }

}
