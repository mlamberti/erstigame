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
  places:Hashtag[];
  sponsors:Hashtag[];
  hashtagsLevel:Hashtag[];
  hashtagsNichtWiederholbar: Hashtag[];
  hashtagsWiederholbar: Hashtag[];
  viewer:User;
  group: Group;
  groupLevel:number;
  numPlacesMust:number ;
  numPlacesHave:number;
  numSponsorsMust:number;
  numSponsorsHave:number;
  numCatchesMust:number;
  numCatchesHave:number;
  numHoursMust:number=5;
  numHoursHave:number=10;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: gql`
        viewer{
          id
          group{
            level {
              id
              rank
              numHours
              numPlaces
              numCatches
              numSponsors
            }
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
              level {
                id
                rank
              }
              
            }
          }
        }
      }   `, 
    })
    .valueChanges.subscribe(result => {
      let viewer = result.data.viewer;
      this.group = viewer.group;
      this.hashtags=viewer.group.hashtags;
      //this.hashtags.marked=false;
      console.log(group.level.rank)
      this.hashtagsWiederholbar=this.hashtags.filter(hashtag=> hashtag.level.rank<= this.group.level.rank && (hashtag=>hashtag.repeatable||!hashtag.done));
      this.hashtagsLevel=this.hashtags.filter(hashtag=> hashtag.level.rank== this.group.level.rank);
      this.hashtagsNichtWiederholbar=this.hashtags.filter(hashtag=> hashtag.level.rank< this.group.level.rank&&hashtag.done && !(hashtag=>hashtag.repeatable));
      this.groupLevel=this.group.level.rank;
      this.catches=this.hashtags.filter(hashtag=>hashtag.name.startsWith("A"));
      this.places=this.hashtags.filter(hashtag=>hashtag.name.startsWith("T"));
      this.sponsors=this.hashtags.filter(hashtag=>hashtag.name.startsWith("C"));
      this.numCatchesHave=this.catches.filter(hashtag=>hashtag.done).length;
      this.numPlacesHave=this.places.filter(hashtag=>hashtag.done).length;
      this.numSponsorsHave=this.sponsors.filter(hashtag=>hashtag.done).length;
      this.numCatchesMust=this.group.level.numCatches;
      this.numSponsorsMust=this.group.level.numSponsors;
      this.numPlacesMust=this.group.level.numPlaces;
    });
  }

}
