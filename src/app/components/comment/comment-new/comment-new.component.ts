import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { PostService } from '../../../services/post.service.client';
import { CommentService } from '../../../services/comment.service.client';

@Component({
  selector: 'app-comment-new',
  templateUrl: './comment-new.component.html',
  styleUrls: ['./comment-new.component.css']
})
export class CommentNewComponent implements OnInit {

  errorFlag: boolean;
  post: any = {};
  errorMsg = '';
  newComment: any = {};
  currentUser: any;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private commentService: CommentService,
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

  createComment(newComment) {
    this.errorFlag = false;
    this.errorMsg = '';
    if (newComment.text == null || newComment.text.trim() == "") {
      this.errorMsg = "Comment text cannot be empty \n";
      this.errorFlag = true;
    }
    if (!this.errorFlag) {
      newComment.author = {
        id: this.currentUser._id,
        username: this.currentUser.username
      }

      this.commentService.createComment(this.currentUser._id, newComment).subscribe(
        (comment: any) => {
          this.post.comments.push(comment._id);

          this.postService.updatePost(this.post._id, this.post).subscribe(
            (updatedPost: any) => {
              const url: any = '/blogs/' + this.post._id;
              this.router.navigate([url]);
            },
            (error: any) => {
              // Place an error message here
              this.errorFlag = true;
              this.errorMsg = error;
            }
          )
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
