import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { BirdsServiceProvider } from './../../providers/birds-service/birds-service';
import { Geolocation } from '@ionic-native/geolocation';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class Bird {
  idUser: string;
  bird_name: string;
  bird_description: string;
  place: string;
  long: number;
  lat: number;

  constructor() {
    this.idUser = localStorage.getItem('idUser');
  }
}

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})

export class AddPage {
  cbLocation = false;
  loading: Loading;
  long = 0;
  lat = 0;
  registerBird: Bird;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public birds: BirdsServiceProvider,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
      this.registerBird = new Bird();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPage');
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo localización...'
    });
    this.loading.present();
  }

  public add(form: NgForm){
    this.registerBird.long = this.long;
    this.registerBird.lat = this.lat;
    this.birds.addBird(this.registerBird).subscribe(
      res => {
        if (res['status'] != 'KO') {
          form.reset();
          this.navCtrl.push(ListPage);
        } else {
          this.showError('Ha ocurrido un error al registrar el ave');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public showLocation() {
    this.showLoading();
    this.geolocation.getCurrentPosition().then((res) => {
      this.long = res.coords.longitude;
      this.lat = res.coords.latitude;
      this.loading.dismiss();
    }).catch((err) => {
      console.log('Error getting location', err);
    });
  }

  showMessage(text)  {
    let alert = this.alertCtrl.create({
      title: 'Info',
      subTitle: text,
      buttons: ['Aceptar']
    });
    alert.present();
  }

  showError(text) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['Aceptar']
    });
    alert.present();
  }
}
