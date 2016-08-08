import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {JWTAuthService} from '../../providers/jwt-auth-service';
import {GroupService} from '../../providers/group-service';
import {Member} from '../../providers/interfaces';
//import {MemberComponent} from '../nsb-components/member-component';

@Component({
  templateUrl: 'build/pages/signup/signup.html'
})

export class SignupPage {
  member: Member = <Member>{}; //firstname: '', lastname: '', email: ''};


  submitted = false;

  constructor ( private navParams: NavParams,
                private nav: NavController,
                private jwtSvc: JWTAuthService,
                private groupSvc: GroupService) {
                    if (navParams.data) {
                        this.member.parentMember = navParams.data;
                    }
                 }

  onSignup(form) {
    this.submitted = true;

    if (form.valid) {
         console.log(this.member);
        this.jwtSvc.signup(this.member)
        .subscribe( res => {
            this.groupSvc.loadMyGroups()
            .subscribe(res => {
            console.log(res);
            }, err => {
                console.log(err);
            },
            () => {});
            this.nav.push(TabsPage);
        }, err => {
            console.log(err);
        },
        () => {
            console.log('done');
        }
        );
    }
  }
}

    // {   username?:  string,
    //     name: {
    //         first?: string,
    //         last?: string,
    //     },
    //     firstname?: string,
    //     lastname?:  string,
    //     password?:  string,
    //     email?:     string,
    //     DoB?:       string
    // } = { name: {first: "", last: ""}};