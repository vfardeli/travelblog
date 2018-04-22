import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { SharedService } from './shared.service';

// injecting Http service into UserService
@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private sharedService: SharedService,
        private router: Router
    ) { }

    baseUrl = environment.baseUrl;

    options = new RequestOptions();

    findCurrentUser() {
        const url = this.baseUrl + '/api/loggedIn';
        return this.http.post(url, '', this.options).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    loggedIn() {
        this.options.withCredentials = true;

        const url = this.baseUrl + '/api/loggedIn';
        return this.http.post(url, '', this.options).map(
            (res: Response) => {
                const user = res.json();
                if (user !== '0') {
                    this.sharedService.user = user; // setting user so as to share with all components
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            }
        );
    }

    login(username: String, password: String) {
        this.options.withCredentials = true;

        const body = {
            username: username,
            password: password
        };

        const url = this.baseUrl + '/api/login';
        return this.http.post(url, body, this.options).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    logout() {
        this.options.withCredentials = true;

        const url = this.baseUrl + '/api/logout';
        return this.http.post(url, '', this.options).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    register(user) {
        this.options.withCredentials = true;
        
        const url = this.baseUrl + '/api/register';
        return this.http.post(url, user, this.options).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    createUser(user) {
        const url = this.baseUrl + '/api/user';
        return this.http.post(url, user).map(
            (res: Response) => {
                return res.json();
            }
        );
    }

    findUserById(userId: String) {
        const url = this.baseUrl + '/api/user/' + userId;
        return this.http.get(url).map(
            (res: Response) => {
                const data = res.json();
                return data;
            }
        );
    }

    updateUser(userId: String, user) {
        const url = this.baseUrl + '/api/user/' + userId;
        return this.http.put(url, user).map((response: Response) => {
            return response.json();
        });
    }

    deleteUser(userId: String) {
        const url = this.baseUrl + '/api/user/' + userId;
        return this.http.delete(url).map(
            (res: Response) => {
                return res.json();
            }
        );
    }
}