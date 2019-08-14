import { Component } from '@angular/core';
import {HASHTAGS} from '../MOCK-HASHTAGS'
@Component({
  selector: 'app-hashtags',
  templateUrl: 'hashtags.page.html',
  styleUrls: ['hashtags.page.scss']
})
export class HashtagsPage {
  hashtags=HASHTAGS;

  constructor() { }
}
