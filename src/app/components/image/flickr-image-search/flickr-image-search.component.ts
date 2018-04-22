import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../../services/flickr.service.client';
import { UserService } from '../../../services/user.service.client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  userId = '';
  user: any = {};
  photos: any[] = [{photo: ''}];
  error: string;
  searchText: string = '';

  constructor(
    private flickrService: FlickrService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.uid;
      return this.userService.findUserById(this.userId).subscribe(
        (user: any) => {
          this.user = user;
        },
        (error: any) => {
          this.error = error;
        }
      );
    });
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    this.user.avatar = url;

    this.userService
      .updateUser(this.user._id, this.user)
      .subscribe(
        (data: any) => {
          const result = data;
          if (result) {
            this.router.navigate(['/users/' + this.userId + '/edit']);
          } else {
            this.error = 'failed!';
          }
        }
      );
  }

}
