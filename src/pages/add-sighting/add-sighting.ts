import { DetailPage } from './../detail/detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { BirdsServiceProvider } from './../../providers/birds-service/birds-service';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-add-sighting',
  templateUrl: 'add-sighting.html',
})
export class AddSightingPage {
  bird_id: any;
  loading: Loading;
  long = 0;
  lat = 0;
  registerSighting = { idAve: 0, place: '', long: 0, lat: 0 };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public birds: BirdsServiceProvider,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

    this.bird_id = this.navParams.get('bird_id');
    this.showLoading();
    this.geolocation.getCurrentPosition().then((res) => {
      this.long = res.coords.longitude;
      this.lat = res.coords.latitude;
      this.loading.dismiss();
    }).catch((err) => {
      console.log('Error getting location', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSightingPage');
  }

  public add(){
    this.registerSighting.lat = this.lat;
    this.registerSighting.long = this.long;
    this.registerSighting.idAve = this.bird_id;
    this.birds.addSighting(this.registerSighting).subscribe(
      res => {
        if (res['status'] != 'KO') {
          this.navCtrl.push(DetailPage, {bird_id: this.bird_id});
        } else {
          this.showError('Ha ocurrido un error al registrar el avistamiento');
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Obteniendo localización...'
    });
    this.loading.present();
  }

  showMessage(text) {
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
