import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { Login } from '../models/login';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
    url: String
    identity: string;
    token: string;

    constructor(private http: HttpClient) {
        this.url = GLOBAL.url;
    }

    signup(user_to_login, getHash = null) {
        if (getHash != null) {
            user_to_login.getHash = getHash;
        }
        let json = JSON.stringify(user_to_login);
        let params = json;

        return this.http.post<Login>(this.url + '/login', params, httpOptions);
    }

    register(user_to_register){
        let params = user_to_register;
        return this.http.post<Login>(this.url + '/register', params, httpOptions);
    }

    updateUser(user_to_update){
        httpOptions.headers.append('Authorization', this.getToken());
        let params = user_to_update;
        return this.http.put<Login>(this.url + '/update-user/' + user_to_update._id, params, httpOptions);
    }

    getIdentity() {
        let identity = localStorage.getItem('identity');
        if (identity != undefined) {
            this.identity = identity;
        }
        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');
        if (token != undefined) {
            this.token = token;
        }
        return this.token;
    }
}