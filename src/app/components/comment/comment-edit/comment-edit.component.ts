import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { PostService } from '../../../services/post.service.client';
import { CommentService } from '../../../services/comment.service.client';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  errorFlag: boolean;
  post: any = {};
  errorMsg = '';
  comment: any = {};
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
        this.commentService.findCommentById(params.cid).subscribe(
          (comment: any) => {
            this.comment = comment;
          },
          (error: any) => {
            // error messsage
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

  updateComment(comment) {
    this.errorFlag = false;
    this.errorMsg = '';
    if (comment.text == null || comment.text.trim() == "") {
      this.errorMsg = "Comment text cannot be empty \n";
      this.errorFlag = true;
    }
    if (!this.errorFlag) {
      this.commentService.updateComment(this.comment._id, comment).subscribe(
        (comment: any) => {
          const url: any = '/blogs/' + this.post._id;
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
