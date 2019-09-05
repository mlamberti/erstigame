import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, Hashtag } from '../../generated/graphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  points = [3,0,1,9,6,0];
  hashtags: Hashtag[];
  groupName: String;
  users: User[];
  date=Date.now();

  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: gql`
      query{
        viewer{
          id
          group {
            name
            users {
              id
              name
              info
            }
          }
          hashtags{
            id
            name
            info
            description
            picture
            points
            repeatTime
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
      this.hashtags = viewer.hashtags
      
    });
  }

}
