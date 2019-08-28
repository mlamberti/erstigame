import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HashtagInfoPage } from './hashtag-info.page';

const routes: Routes = [
  {
    path: ':id', component: HashtagInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HashtagInfoPage]
})
export class HashtagInfoPageModule {}
