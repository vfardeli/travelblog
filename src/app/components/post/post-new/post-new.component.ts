import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { PostService } from '../../../services/post.service.client';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  errorFlag: boolean;
  errorMsg = '';
  newPost: any = {};
  currentUser: any;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.findCurrentUser().subscribe(
      (user: any) => {
        this.currentUser = user;
      }
    )
  }

  createPost(newPost) {
    this.errorFlag = false;
    this.errorMsg = '';
    if (newPost.name == null || newPost.name.trim() == "") {
      this.errorMsg = "Name cannot be empty \n";
      this.errorFlag = true;
    }
    if (newPost.description == null || newPost.description.trim() == "") {
      this.errorMsg = "Description cannot be empty \n";
      this.errorFlag = true;
    }
    if (newPost.location == null || newPost.location.trim() == "") {
      this.errorMsg = "Location cannot be empty \n";
      this.errorFlag = true;
    }
    if (newPost.image == null || newPost.image.trim() == "") {
      this.errorMsg = "Image cannot be empty \n";
      this.errorFlag = true;
    }
    if (!this.errorFlag) {
      newPost.author = {
        id: this.currentUser._id,
        username: this.currentUser.username
      }

      this.postService.createPost(this.currentUser._id, newPost).subscribe(
        (post: any) => {
          const url: any = '/blogs/' + post._id;
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
