import {Component} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {UserData} from '../../providers/user-data';
import {JWTAuthService} from '../../providers/jwt-auth-service';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/account/account.html',
})
export class AccountPage {
  username: string;

  constructor(private nav: NavController, private userData: UserData, private authSvc: JWTAuthService) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  changeUsername() {
    let alert = Alert.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });
    this.nav.present(alert);
  }

  getUsername() {
    this.authSvc.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.authSvc.logout();
    this.nav.setRoot(LoginPage);
  }
}