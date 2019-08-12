import { Component } from '@angular/core';
import { USERS } from '../MOCK-USERS';
import {ACTIVITYS} from'../MOCK-ACTIVITYS';
import {ITimer} from '../itimer';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'] 
})
export class GroupPage {
  users = USERS;
  activitys=ACTIVITYS;
  public data: boolean=false;
  public dateTime : string = '';
  
  }
