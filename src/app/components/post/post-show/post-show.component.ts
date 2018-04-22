import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../../services/user.service.client';
import { PostService } from '../../../services/post.service.client';
import { CommentService } from '../../../services/comment.service.client';
import { environment } from '../../../../environments/environment';

declare const google: any;

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit {

  baseUrl = environment.baseUrl;
  postId: String;
  errorFlag: boolean;
  errorMsg = '';
  post: any;
  currentUser: any;

  constructor(
    private commentService: CommentService,
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
    );
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.postId = params.bid;
        return this.postService.findPostById(this.postId).subscribe(
          (post: any) => {
            this.post = post;
            this.initMap();
          }
        );
      }
    );
  }

  initMap() {
    var lat = this.post.lat;
    var lng = this.post.lng;
    var center = { lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: center,
      scrollwheel: false
    });
    var contentString = '<strong>' + this.post.name +
      '<br />' + this.post.location + '</strong><p>'
      + this.post.description + '</p>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var marker = new google.maps.Marker({
      position: center,
      map: map
    });
    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });
  }

  deletePost(postId) {
    if (postId != null && postId.trim() != "") {
      this.postService.deletePost(postId).subscribe(
        (post: any) => {
          let url: any = '/blogs';
          this.router.navigate([url]);
        },
        (error: any) => {
          // Place error message;
        }
      );
    }
  }

  deleteComment(commentId) {
    this.commentService.deleteComment(commentId).subscribe(
      (comment: any) => {
        this.ngOnInit();
      }
    )
  }
}
