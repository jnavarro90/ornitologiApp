import { BirdsServiceProvider } from './../../providers/birds-service/birds-service';
import { AddSightingPage } from './../add-sighting/add-sighting';
import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  bird_id: any
  bird = []
  loading: Loading

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public birds: BirdsServiceProvider,
    public loadingCtrl: LoadingController) { this.bird_id = this.navParams.get('bird_id');}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    this.getData();
  }

  private getData(){
    this.birds.getOne(this.bird_id)
      .subscribe(
        res => {
          this.bird = res[0];
          console.log(this.bird);
        }
      );
  }

  public addSighting(id){
    this.navCtrl.push(AddSightingPage, {
      bird_id: id
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Espera por favor...'
    });
    this.loading.present();
  }
}
