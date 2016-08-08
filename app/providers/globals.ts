import {Injectable} from "@angular/core";
import { Cookie } from "ng2-cookies/ng2-cookies";

@Injectable()
export class MyGlobals {
    private _apiUrl = "http://localhost:3000/api/";
    private _cookie: string;

    constructor() {}

    // setValue(val) {
    //     this.myValue = val;
    // }

    getApiUrl() {
        return this._apiUrl;
    }
    setCookie(token: string) {
        this._cookie = "Bearer " + token;
        Cookie.set("token", "Bearer " + token, 10 /*days from now*/);
    }
    getCookie() {
        if (this._cookie) {
            return this._cookie;
        } else {
            this._cookie = Cookie.get("token");
            return this._cookie;
            //throw "Invalid Cookie Exception";
        }
    }
    hasCookie(){
        if (this._cookie) {
            return true;
        } else {
            return false;
        }
    }
}