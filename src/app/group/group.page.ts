import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { QRCodeModule } from 'angularx-qrcode';
import { Group, User } from '../../generated/graphql';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-group',
  templateUrl: 'group.page.html',
  styleUrls: ['group.page.scss']
})
export class GroupPage implements OnInit {
  users: User[];
  groupName: string;
  linkQR: string;

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
                token
                users {
                  id
                  name
                  info
                  invalidated
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        const viewer = result.data.viewer;

        this.groupName = viewer.group.name;
        this.users = viewer.group.users;
        this.linkQR = environment.frontendUrl + '/registry/' + viewer.group.token;
      });
  }
}
