import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting Http service into UserService
@Injectable()
export class CommentService {

    constructor(
        private http: Http,
        private router: Router
    ) { }

    baseUrl = environment.baseUrl;

    options = new RequestOptions();

    createComment(userId, comment) {
        const url = this.baseUrl + '/api/user/' + userId + '/comment';
        return this.http.post(url, comment).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    findCommentById(commentId) {
        const url = this.baseUrl + '/api/comment/' + commentId;
        return this.http.get(url).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    updateComment(commentId, comment) {
        const url = this.baseUrl + '/api/comment/' + commentId;
        return this.http.put(url, comment).map((response: Response) => {
            return response.json();
        });
    }

    deleteComment(commentId) {
        const url = this.baseUrl + '/api/comment/' + commentId;
        return this.http.delete(url).map(
            (res: Response) => {
                return res.json();
            }
        );
    }
}