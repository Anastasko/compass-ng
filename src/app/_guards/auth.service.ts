import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "../login/user";
import {Service} from "../common/service.service";
import {ServiceLocator} from "../service-locator.service";
import {Http} from "@angular/http";
import {config} from "../config";

@Injectable()
export class AuthService extends Service<User> {

    constructor(private router: Router) {
        super();
    }

    prefix(): string {
        return '/user';
    }

    getInstance(o: any): User {
        return new User(o);
    }

    login(options: User) {
        return this._http.post(config.endpoint + this.prefix() + '/auth', options)
            .map(res => {
                return res.json();
            })
            .toPromise()
            .then(r => {
                console.log(r);
                localStorage.setItem('token', r.token);
            });
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
    }

    loggedIn() {
        return localStorage.getItem('token') != null;
    }
}