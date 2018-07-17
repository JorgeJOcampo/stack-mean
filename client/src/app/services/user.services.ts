import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import {map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService{
 public url: String

 constructor(private http: HttpClient){
     this.url = GLOBAL.url;
 }

 signup(user_to_login, getHash = null){
    if(getHash != null){
        user_to_login.getHash = getHash;
    } 
    let json = JSON.stringify(user_to_login);
     let params = json;
     
     return this.http.post(this.url+'login', params, httpOptions);
 }
}