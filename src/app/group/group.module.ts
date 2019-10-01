import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupPage } from './group.page';
import { QRCodeModule } from 'angularx-qrcode';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    QRCodeModule,
    RouterModule.forChild([{ path: '', component: GroupPage }])
  ],
  declarations: [GroupPage]
})
export class GroupPageModule {}
