import { Component } from '@angular/core';
import { User } from '../User';
import { USERS } from '../MOCK-USERS';
import { GROUPS } from '../MOCK-GROUPS';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss'] 
})
export class GroupPage {
  users: User[];
  groupName:string;

  constructor() {
    let group = GROUPS[0];
    this.users = USERS.filter(user=>user.gid == group.id); 
    this.groupName = group.name;
  }

}
