import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
  places:Hashtag[];
  sponsors:Hashtag[];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
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
        this.hashtags = result.data.allHashtags;
        this.catches = this.hashtags.filter(hashtag => hashtag.name.startsWith('Catch'));
        this.places = this.hashtags.filter(hashtag => hashtag.name.startsWith('Tag'));
        this.sponsors= this.hashtags.filter(hashtag => hashtag.name.startsWith('A'));
      });
  }

}
