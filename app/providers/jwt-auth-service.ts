import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import {URLSearchParams, Jsonp} from '@angular/http';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {MyGlobals} from './globals';
import {Storage, LocalStorage, Events} from 'ionic-angular';

export interface JWTUser {
    username: string;
    password: string;
}

@Injectable()
export class JWTAuthService {
    public apiUrl: string;
    storage = new Storage(LocalStorage);
    constructor(private _http: Http,
                //private jsonp: Jsonp,
                private events: Events,
                private _globals: MyGlobals) {
                    this.apiUrl = this._globals.getApiUrl();
                };
    login(user: JWTUser) {
        let body = JSON.stringify(user);
        let headers = this.getHeaders();
        return this._http
            .post(this.apiUrl + 'pub/login', body, { headers: headers })
            .map(res => {
                let data = res.json();
                console.log(data);
                this.initialize(data);
                return data;
            });
    }

    signup(user: any) {
        let body = JSON.stringify(user);
        let headers = this.getHeaders();
        return this._http
            .post(this.apiUrl + 'pub/signup', body, { headers: headers })
            .map(res => {
                let data = res.json();
                console.log(user);
                if (user.parentMember === 'undefined') {
                    this.initialize(data);
                }
                return data;
            });
    }

    logout() {
        Cookie.delete('token');
        this.events.publish('user:logout');
    }

    isLoggedIn() {
        if (Cookie.get('token')) {
            return true;
        } else {
            return false;
        }
    }
    initialize(data) {
        this.setToken(data.token);
        this.setUser(data.member);
        this.events.publish('user:login');
    }

    getHeaders() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('CAccess-Control-Allow-Methods', 'GET, POST, OPTIONS');
        return headers;
    }

    setToken(token) {
        Cookie.set('token', 'Bearer ' + token, 10 /*days from now*/);
    }

    getAuthHeader() {
        let myToken = Cookie.get('token');
        let headers = this.getHeaders();
        if (myToken) {
            console.log('adding token to request');
            headers.append('Authorization', myToken);
        } else {
            throw 'Invalid Token';
        }
        return headers;
    }

    setUser(m) {
        this.storage.set('username', m.username);
        this.storage.set('memberId', m.id);
    }

    getUsername() {
        return this.storage.get('username').then((value) => {
        return value;
        });
    }
    getMemberId() {
        return this.storage.get('memberId').then((value) => {
        return value;
        });
    }
}