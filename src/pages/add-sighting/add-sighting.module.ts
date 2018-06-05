import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddSightingPage } from './add-sighting';

@NgModule({
  declarations: [
    AddSightingPage,
  ],
  imports: [
    IonicPageModule.forChild(AddSightingPage),
  ],
})
export class AddSightingPageModule {}
