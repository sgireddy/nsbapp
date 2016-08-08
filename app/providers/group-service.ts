import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { JWTAuthService } from './jwt-auth-service';

let apiUrl = 'http://localhost:3000/api/';

@Injectable()
export class GroupService {
    constructor(private _http: Http, private _authsvc: JWTAuthService) {};
    loadMyGroups() {
        let headers = this._authsvc.getAuthHeader();
        let body = {};
        return this._http
            .post(apiUrl + 'groups', JSON.stringify(body), { headers: headers })
            //.map(res => res.json());
            .map(res => {
                let data = res.json();
                console.log(data);
                return data;
            });
    }
    loadMyMembers() {
        let headers = this._authsvc.getAuthHeader();
        let body = {};
        return this._http
            .post(apiUrl + 'members', JSON.stringify(body), { headers: headers })
            .map(res => res.json());
    }
    addMemberToGroup(groupId, memberId){
        let headers = this._authsvc.getAuthHeader();
        let body = { 'group': groupId, 'member': memberId };
        return this._http
            .post(this._authsvc.apiUrl + 'addmember', JSON.stringify(body), { headers: headers })
            .map(res => {
                let data = res.json();
                console.log(data);
                return data;
            });
    }

    searchMembers (term: string) {
        let headers = this._authsvc.getAuthHeader();
        let body = { 'str': term };
        return this._http
            .post(this._authsvc.apiUrl + 'search', JSON.stringify(body), { headers: headers })
            .map(res => {
                let data = res.json();
                console.log(data);
                return data;
            });
    // var search = new URLSearchParams()
    // search.set('action', 'opensearch');
    // search.set('search', term);
    // search.set('format', 'json');
    // return this.jsonp
    //             .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
    //             .map((request) => request.json()[1]);
  }
}



    // loadGroups() {
    //     let headers = this.getAuthHeader();
    //     let body = { 'name': 'Group1' };
    //     return this._http
    //         .post(this.apiUrl + 'groups', JSON.stringify(body), { headers: headers })
    //         .map(res => {
    //             let data = res.json();
    //             console.log(data);
    //             return data;
    //         });
    // }

    // loadMember() {
    //     let headers = this.getAuthHeader();
    //     let body = { };
    //     return this._http
    //         .post(this.apiUrl + 'me', JSON.stringify(body), { headers: headers })
    //         .map(res => {
    //             let data = res.json();
    //             console.log(data);
    //             return data;
    //         });
    // }