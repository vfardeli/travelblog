import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { Routing } from './app.routing';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PostShowComponent } from './components/post/post-show/post-show.component';
import { PostNewComponent } from './components/post/post-new/post-new.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { CommentNewComponent } from './components/comment/comment-new/comment-new.component';
import { CommentEditComponent } from './components/comment/comment-edit/comment-edit.component';
import { EditComponent } from './components/user/edit/edit.component';
import { FlickrImageSearchComponent } from './components/image/flickr-image-search/flickr-image-search.component';

import { AuthGuard } from './services/auth-guard.service';
import { SharedService } from '../app/services/shared.service';
import { UserService } from '../app/services/user.service.client';
import { PostService } from '../app/services/post.service.client';
import { CommentService } from '../app/services/comment.service.client';
import { FlickrService } from '../app/services/flickr.service.client';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    PostListComponent,
    PostShowComponent,
    PostNewComponent,
    PostEditComponent,
    CommentNewComponent,
    CommentEditComponent,
    EditComponent,
    FlickrImageSearchComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    FormsModule,
    HttpModule
  ],
  providers: [UserService, PostService, CommentService, SharedService, FlickrService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
