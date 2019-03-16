import { Component } from '@angular/core';
import { USERS } from '../MOCK-USERS';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'] 
})
export class Tab2Page {
  users = USERS;
}
