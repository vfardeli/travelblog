import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  user = {};
  userId: String;
  errorFlag: boolean;
  errorMessage: String;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.uid;
      return this.userService.findUserById(this.userId).subscribe(
        (user: any) => {
          this.user = user;
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMessage = error.toString();
        }
      );
    });
  }

  updateUser(updatedUser) {
    this.errorFlag = false;
    this.errorMessage = '';
    if (updatedUser.firstName == null || updatedUser.firstName.trim() == "") {
      this.errorMessage = "First Name cannot be empty \n";
      this.errorFlag = true;
    }
    if (updatedUser.lastName == null || updatedUser.lastName.trim() == "") {
      this.errorMessage = "Last Name cannot be empty \n";
      this.errorFlag = true;
    }
    if (updatedUser.email == null || updatedUser.email.trim() == "") {
      this.errorMessage = "Email cannot be empty \n";
      this.errorFlag = true;
    }
    if (this.errorFlag = false) {
      this.userService.updateUser(this.userId, updatedUser).subscribe(
        (user: any) => {
          this.errorFlag = false;
          this.user = user;
          this.router.navigate(['/users', user._id]);
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMessage = error;
        }
      );
    }
  }
}
