import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Group, User } from '../../generated/graphql';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
export class GroupPage implements OnInit {
  users: User[];
  groupName: string;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery<{ viewer: { group: Group }}>({
        query: gql`
          query{
            viewer {
              id
              group {
                id
                name
                users {
                  id
                  name
                  info
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        console.log(result);
        let viewer = result.data.viewer;

        this.groupName = viewer.group.name;
        this.users = viewer.group.users;
      });
  }
}
