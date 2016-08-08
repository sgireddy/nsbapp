import {Component} from '@angular/core';
import {Control, CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {NavController, NavParams} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {GroupService} from '../../providers/group-service';
import {Member} from '../../providers/interfaces';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  templateUrl: 'build/pages/members/member.html',
  directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class MemberSearchPage {
  signup: Member;
  term = new Control();
  items: Observable<Array<Member>>;
  submitted = false;
  groupId: string;

  constructor(private navParams: NavParams, private nav: NavController, private groupSvc: GroupService) {
      this.groupId = navParams.data;
      this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.groupSvc.searchMembers(term));
  }

  addToGroup(id){
      console.log("member id: " + id + " group id: " + this.groupId);
      this.groupSvc.addMemberToGroup(this.groupId, id)
      .subscribe( res => {
            this.nav.push(TabsPage);
        }, err => {
            console.log(err);
        },
        () => {
            console.log("done");
        });
}
//   onSignup(form) {
//     this.submitted = true;

//     if (form.valid) {
//          console.log(this.signup);
//         this.jwtSvc.signup(this.signup)
//         .subscribe( res => {
//             this.jwtSvc.loadGroups()
//             .subscribe(res => {
//             console.log(res);
//             }, err => {
//                 console.log(err);
//             },
//             () => {});
//             this.nav.push(TabsPage);
//         }, err => {
//             console.log(err);
//         },
//         () => {
//             console.log("done");
//         }
//         );
//     }
}