import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { PostService } from '../../../services/post.service.client';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // properties
  user = {};
  posts: any = {};
  currentUser: any;
  userId: String;
  errorFlag: boolean;
  errorMessage: String;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.userService.findCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      }
    );
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.uid;
      this.userService.findUserById(this.userId).subscribe(
        (user: any) => {
          this.user = user;
          this.postService.findAllPostsForUser(this.userId).subscribe(
            (posts: any) => {
              this.posts = posts;
            }
          )
        },
        (error: any) => {
          this.errorFlag = true;
          this.errorMessage = error.toString();
        }
      );
    });
  }

  deleteUser(userId) {
    this.userService.deleteUser(userId).subscribe(
      (user: any) => {
        let url: any = '/blogs';
        this.router.navigate([url]);
      },
      (error: any) => {
        // error msg
      }
    )
  }
}
