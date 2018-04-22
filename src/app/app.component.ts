import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './services/user.service.client';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Travel Blog';
  currentUser: any;
  baseUrl = environment.baseUrl;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.findCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      }
    )
  }

  logout() {
    this.userService.logout().subscribe(
      (data: any) => {
        window.location.replace(this.baseUrl + "/blogs");
      }
    );
  }
}
