import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting Http service into UserService
@Injectable()
export class PostService {

    constructor(
        private http: Http,
        private router: Router
    ) { }

    baseUrl = environment.baseUrl;

    options = new RequestOptions();

    createPost(userId, post) {
        const url = this.baseUrl + '/api/user/' + userId + '/post';
        return this.http.post(url, post).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    findAllPosts() {
        const url = this.baseUrl + '/api/post';
        return this.http.get(url).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    findAllPostsForUser(userId) {
        const url = this.baseUrl + '/api/user/' + userId + '/post';
        return this.http.get(url).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    findPostById(postId) {
        const url = this.baseUrl + '/api/post/' + postId;
        return this.http.get(url).map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        );
    }

    updatePost(postId, post) {
        const url = this.baseUrl + '/api/post/' + postId;
        return this.http.put(url, post).map((response: Response) => {
            return response.json();
        });
    }

    deletePost(postId) {
        const url = this.baseUrl + '/api/post/' + postId;
        return this.http.delete(url).map(
            (res: Response) => {
                return res.json();
            }
        );
    }
}