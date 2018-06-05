import { LoginPage } from './../login/login';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  tabBarElement: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthServiceProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');

    this.auth.logout().subscribe(
      res => {
        if (res) {
          this.navCtrl.push(LoginPage);
        }
      }
    );
  }

}
