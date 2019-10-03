import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgxPicaModule } from '@digitalascetic/ngx-pica';

import { CameraPage } from './camera.page';

const routes: Routes = [
  {
    path: '',
    component: CameraPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxPicaModule,
  ],
  declarations: [CameraPage],
})
export class CameraPageModule {}
