import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, Hashtag } from '../../generated/graphql';

@Component({
  selector: 'app-hashtags',
  templateUrl: 'hashtags.page.html',
  styleUrls: ['hashtags.page.scss']
})
export class HashtagsPage implements OnInit {
  hashtags: Hashtag[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery<{ viewer: User }>({
        query: gql`
          query{
            viewer {
              group {
                hashtags {
                  id
                  name
                  info
                  level
                  points
                  done
                }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.hashtags = result.data.viewer.group.hashtags;
      });
  }

}
