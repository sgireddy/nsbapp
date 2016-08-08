import {Component} from '@angular/core';
import {NavController, Page, ActionSheet, Alert} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import {GroupService} from '../../providers/group-service';
import {JWTAuthService} from '../../providers/jwt-auth-service';
import {Member} from '../../providers/interfaces';
import {MemberSearchPage} from '../members/member';
import {SignupPage} from '../signup/signup';

//import {GroupDetailPage} from '../group-detail/group-detail';

@Component({
  templateUrl: 'build/pages/groups/groups.html'
})
export class GroupListPage {
  actionSheet: ActionSheet;
  //groupSvc: GroupService;
  memberList: Observable<Array<Member>>;

  constructor(private nav: NavController, private groupSvc: GroupService, private authSvc: JWTAuthService) {
    //this.groupSvc = groupSvc;
  }

  onPageWillEnter() {
      this.memberList = this.groupSvc.loadMyGroups();
    }

   addMember(groupId) {
    this.nav.push(MemberSearchPage, groupId);
   }

   createMember() {
    this.authSvc.getMemberId().then((id) => {
      this.nav.push(SignupPage, id);
    });
    }
}


// let alert = Alert.create({
    //   title: 'Will Add New Member!',
    //   subTitle: 'group id ' + groupId,
    //   buttons: ['OK']
    // });
    //this.nav.present(alert);
