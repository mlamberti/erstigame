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
  hashtagsNichtWiederholbar: Hashtag[];
  hashtagsWiederholbar: Hashtag[];
  viewer:User;
  group: Group;
  groupLevel:number;
  numPlacesMust:number=1;
  numPlacesHave:number;
  numSponsorsMust:number=5;
  numSponsorsHave:number;
  numCatchesMust:number=5;
  numCatchesHave:number;
  numHoursMust:number=5;
  numHoursHave:number=10;
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
              repeatable
              done
              level
              
            }
          }
        }
      }`, 
    })
    .valueChanges.subscribe(result => {
      let viewer = result.data.viewer;
      this.group = viewer.group;
      this.hashtags=viewer.group.hashtags;
      this.hashtagsWiederholbar=this.hashtags.filter(hashtag=> hashtag.level<= this.group.level && (hashtag=>hashtag.repeatable||!hashtag.done));
      this.hashtagsLevel=this.hashtags.filter(hashtag=> hashtag.level== this.group.level);
      this.hashtagsNichtWiederholbar=this.hashtags.filter(hashtag=> hashtag.level< this.group.level&&hashtag.done && !(hashtag=>hashtag.repeatable));
      this.groupLevel=this.group.level;
      this.catches=this.hashtags.filter(hashtag=>hashtag.name.startsWith("A"));
      this.places=this.hashtags.filter(hashtag=>hashtag.name.startsWith("T"));
      this.sponsors=this.hashtags.filter(hashtag=>hashtag.name.startsWith("C"));
      this.numCatchesHave=this.catches.filter(hashtag=>hashtag.done).length;
      this.numPlacesHave=this.places.filter(hashtag=>hashtag.done).length;
      this.numSponsorsHave=this.sponsors.filter(hashtag=>hashtag.done).length;
    });
  }

}
