import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HashtagsPage } from './hashtags.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HashtagsPage }])
  ],
  declarations: [HashtagsPage,ExpandableComponent]
})
export class HashtagsPageModule {}
