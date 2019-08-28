import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Hashtag } from '../../generated/graphql';

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
      .watchQuery<{ allHashtags: Hashtag[] }>({
        query: gql`
          query{
            allHashtags {
              id
              name
              info
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.hashtags = result.data.allHashtags;
      });
  }

}
