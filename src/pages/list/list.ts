import { DetailPage } from './../detail/detail';
import { BirdsServiceProvider } from './../../providers/birds-service/birds-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  loading: Loading
  list: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public birds: BirdsServiceProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    //_________________________TODO
    this.getData(localStorage.getItem('idUser'));
  }

  getData(id){
    this.birds.getAll(id)
      .subscribe(
        res => {
          this.list = res;
        }
      );
  }

  public viewDetail(id) {
    this.navCtrl.push(DetailPage, {
      bird_id: id
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espera por favor...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
