import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Hashtag } from '../../generated/graphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  points = [3,0,1,9,6,0];
  hashtags: Hashtag[];
  date=Date.now()
  constructor(private apollo: Apollo) {

  }

  ngOnInit() {
    this.apollo
    .watchQuery<{ allHashtags: Hashtag[] }>({
      query: gql`
      query{
        allHashtags {
          id
          name
          info
          description
          picture
          points
          repeatTime
        }
        viewer {
              id
              group {
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
      this.hashtags = result.data.allHashtags
        console.log(result);
        let viewer = result.data.viewer;
        this.groupName = viewer.group.name;
        this.users = viewer.group.users;
    });
  }

}
