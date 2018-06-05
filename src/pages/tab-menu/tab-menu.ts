import { Component } from '@angular/core';

import {ListPage} from '../list/list'
import {AddPage} from '../add/add'
import {InfoPage} from '../info/info'
import {LogoutPage} from '../logout/logout'

/**
 * Generated class for the TabMenuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'tab-menu.html'
})
export class TabMenuPage {

  listRoot = ListPage
  addRoot = AddPage
  infoRoot = InfoPage
  logoutRoot = LogoutPage

  constructor() {}

}
