import { Component } from '@angular/core';
import { USER } from '../MOCK-USER';
import {PICTURE } from'../MOCK-PICTURE';
import {GROUP } from'../MOCK-GROUP';
import {knownid} from'../global';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'] 
})
export class GroupPage {
  user = USER;
  picture=PICTURE;
  group=GROUP;
  knownid=knownid;
}