import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, Hashtag, Group} from '../../generated/graphql';
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
  hashtagsLevel:Hashtag[];
  hashtagsWiederholbar: Hashtag[];
  viewer:User;
  group: Group;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: gql`
      query{
        viewer{
          id
          group{
            level
            hashtags{
              id
              name
              info
              description
              picture
              points
              repeatTime
              done
              level
              
            }
          }
        }
      }`, 
    })
    .valueChanges.subscribe(result => {
      let viewer = result.data.viewer;
      let group = result.data.viewer.group;
      let hashtags= result.data.viewer.group.hashtags;
      this.hashtagsWiederholbar=hashtags;

    });
  }

}
