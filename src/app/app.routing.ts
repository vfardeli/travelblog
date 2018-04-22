import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from "./components/user/login/login.component";
import { ProfileComponent } from "./components/user/profile/profile.component";
import { RegisterComponent } from "./components/user/register/register.component";
import { EditComponent } from "./components/user/edit/edit.component";
import { PostListComponent } from "./components/post/post-list/post-list.component";
import { PostShowComponent } from "./components/post/post-show/post-show.component";
import { PostNewComponent } from "./components/post/post-new/post-new.component";
import { PostEditComponent } from "./components/post/post-edit/post-edit.component";
import { CommentNewComponent } from "./components/comment/comment-new/comment-new.component";
import { CommentEditComponent } from "./components/comment/comment-edit/comment-edit.component";
import { FlickrImageSearchComponent } from "./components/image/flickr-image-search/flickr-image-search.component";

import { AuthGuard } from './services/auth-guard.service';

const APP_ROUTES: Routes = [
    { path: '', component: PostListComponent },
    { path: 'default', component: PostListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'users/:uid', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'users/:uid/edit', component: EditComponent, canActivate: [AuthGuard] },
    { path: 'users/:uid/flickr', component: FlickrImageSearchComponent, canActivate: [AuthGuard] },
    { path: 'blogs', component: PostListComponent },
    { path: 'blogs/new', component: PostNewComponent, canActivate: [AuthGuard] },
    { path: 'blogs/:bid', component: PostShowComponent },
    { path: 'blogs/:bid/edit', component: PostEditComponent, canActivate: [AuthGuard] },
    { path: 'blogs/:bid/comments/new', component: CommentNewComponent, canActivate: [AuthGuard] },
    { path: 'blogs/:bid/comments/:cid/edit', component: CommentEditComponent, canActivate: [AuthGuard] }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
