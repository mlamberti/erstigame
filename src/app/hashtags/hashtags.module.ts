import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HashtagsPage } from './hashtags.page';
import { ExpandableComponent } from "../components/expandable/expandable.component";
import { NgMathPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NgMathPipesModule,
    RouterModule.forChild([{ path: '', component: HashtagsPage }])
  ],
  declarations: [HashtagsPage,ExpandableComponent]
})
export class HashtagsPageModule {}
