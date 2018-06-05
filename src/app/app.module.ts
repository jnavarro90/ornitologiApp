import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import {ListPage} from '../pages/list/list';
import {AddPage} from '../pages/add/add';
import {InfoPage} from '../pages/info/info';
import {LogoutPage} from '../pages/logout/logout';
import {TabMenuPage} from '../pages/tab-menu/tab-menu';
import { LoginPage } from './../pages/login/login';
import { DetailPage } from './../pages/detail/detail'
import { AddSightingPage } from './../pages/add-sighting/add-sighting';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpClientModule } from '@angular/common/http';
import { BirdsServiceProvider } from '../providers/birds-service/birds-service';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    AddPage,
    InfoPage,
    LogoutPage,
    TabMenuPage,
    LoginPage,
    DetailPage,
    AddSightingPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    AddPage,
    InfoPage,
    LogoutPage,
    TabMenuPage,
    LoginPage,
    DetailPage,
    AddSightingPage
  ],
  providers: [
    StatusBar,
    SplashScreen, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    AuthServiceProvider,
    BirdsServiceProvider,
    Geolocation
  ]
})
export class AppModule {}
