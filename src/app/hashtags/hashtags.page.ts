import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User } from '../../generated/graphql';
import { Hashtag } from '../../generated/graphql';
import { ExpandableComponent } from "../components/expandable/expandable.component";

@Component({
  selector: 'app-hashtags',
  templateUrl: 'hashtags.page.html',
  styleUrls: ['hashtags.page.scss']
})
export class HashtagsPage implements OnInit {
  hashtags: Hashtag[];
  catches: Hashtag[];
  places:Hashtag[]
  sponsors:Hashtag[];
  viewer:User;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
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
        let viewer = result.data.viewer;
        this.catches = this.viewer.group.hashtags.filter(hashtag => hashtag.name.startsWith('Catch'));
        this.places = this.viewer.group.hashtags.filter(hashtag => hashtag.name.startsWith('Tag'));
        this.sponsors= this.viewer.group.hashtags.filter(hashtag => hashtag.name.startsWith('A'));
      });
   }

}
