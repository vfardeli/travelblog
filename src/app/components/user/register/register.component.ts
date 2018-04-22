import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  baseUrl = environment.baseUrl;
  errorFlag: boolean;
  errorMsg = '';
  newUser: any = {};
  adminCode = '';
  verifyPassword = '';

  constructor(
    private userService: UserService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(newUser, verifyPassword, adminCode) {
    this.errorFlag = false;
    this.errorMsg = '';
    if (newUser.username == null || newUser.username.trim() == "") {
      this.errorMsg += "Username cannot be empty \n";
      this.errorFlag = true;
    }
    if (newUser.password == null || newUser.password.trim() == "") {
      this.errorMsg += "Password cannot be empty \n";
      this.errorFlag = true;
    }
    if (verifyPassword == null || verifyPassword.trim() == "") {
      this.errorMsg += "Verify Password cannot be empty \n";
      this.errorFlag = true;
    }
    if (verifyPassword != newUser.password) {
      this.errorMsg += "Password and Verify Password do not match \n";
      this.errorFlag = true;
    }
    if (newUser.firstName == null || newUser.firstName.trim() == "") {
      this.errorMsg += "First Name cannot be empty \n";
      this.errorFlag = true;
    }
    if (newUser.lastName == null || newUser.lastName.trim() == "") {
      this.errorMsg += "Last Name cannot be empty \n";
      this.errorFlag = true;
    }
    if (newUser.email == null || newUser.email.trim() == "") {
      this.errorMsg += "Email cannot be empty \n";
      this.errorFlag = true;
    }
    if (!this.errorFlag) {
      if (this.adminCode == 'AdminCode!') {
        newUser.isAdmin = true;
      }
      newUser.avatar = 'https://pixabay.com/get/e836b40b2bf1093ed1584d05fb1d4e97e07ee3d21cac104497f4c271a3e4b5b9_340.png';
      this.userService.register(newUser).subscribe(
        (user: any) => {
          window.location.replace(this.baseUrl + "/blogs");
        },
        (error: any) => {
          // Place an error message here
          this.errorFlag = true;
          this.errorMsg = "Username has been used.";
        }
      );
    }
  }

}
