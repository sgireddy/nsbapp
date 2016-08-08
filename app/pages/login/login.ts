import {Component} from '@angular/core';
import {Observable, Subscription } from "rxjs/Rx";
import {NavController} from "ionic-angular";
import {TabsPage} from "../tabs/tabs";
import {SignupPage} from "../signup/signup";
import {UserData} from "../../providers/user-data";
import {JWTAuthService, JWTUser} from "../../providers/jwt-auth-service";

@Component({
  templateUrl: "build/pages/login/login.html"
})

export class LoginPage {
  submitted = false;
  login: JWTUser = <JWTUser>{};
  constructor(private nav: NavController, private jwtSvc: JWTAuthService) {
      if(jwtSvc.isLoggedIn()){
          this.nav.push(TabsPage);
      }
   }

  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
        console.log(this.login);
        this.jwtSvc.login(this.login)
        .subscribe( res => {
            this.nav.push(TabsPage);
        }, err => {
            console.log(err);
        },
        () => {
            console.log("done");
        });
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
}