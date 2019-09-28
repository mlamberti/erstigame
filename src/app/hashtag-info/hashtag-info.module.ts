import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HashtagInfoPage } from './hashtag-info.page';

const routes: Routes = [
  { path: 'catches', loadChildren: './catches/catches.module#CatchesPageModule' },
  { path: 'places', loadChildren: './places/places.module#PlacesPageModule' },
  { path: 'sponsors', loadChildren: './sponsors/sponsors.module#SponsorsPageModule' },
  { path: 'hours', loadChildren: './hours/hours.module#HoursPageModule' },
  { path: ':hashtagId', component: HashtagInfoPage }
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
