import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { PostService } from '../../../services/post.service.client';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  errorFlag: boolean;
  errorMsg = '';
  post: any = {};
  currentUser: any;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.postService.findPostById(params.bid).subscribe(
          (post: any) => {
            this.post = post;
          },
          (error: any) => {
            // this is the place to put an error message
          }
        );
        this.userService.findCurrentUser().subscribe(
          (user: any) => {
            this.currentUser = user;
          }
        );
      }
    );
  }

  updatePost(post) {
    this.errorFlag = false;
    this.errorMsg = '';
    if (post.name == null || post.name.trim() == "") {
      this.errorMsg = "Name cannot be empty \n";
      this.errorFlag = true;
    }
    if (post.description == null || post.description.trim() == "") {
      this.errorMsg = "Description cannot be empty \n";
      this.errorFlag = true;
    }
    if (post.location == null || post.location.trim() == "") {
      this.errorMsg = "Location cannot be empty \n";
      this.errorFlag = true;
    }
    if (post.image == null || post.image.trim() == "") {
      this.errorMsg = "Image cannot be empty \n";
      this.errorFlag = true;
    }
    if (!this.errorFlag) {
      post.author = {
        id: this.currentUser._id,
        username: this.currentUser.username
      }

      this.postService.updatePost(this.post._id, post).subscribe(
        (updatedPost: any) => {
          const url: any = '/blogs/' + updatedPost._id;
          this.router.navigate([url]);
        },
        (error: any) => {
          // Place an error message here
          this.errorFlag = true;
          this.errorMsg = error;
        }
      );
    }
  }

}
