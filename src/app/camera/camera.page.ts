import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { User, Hashtag, Group , HashtagCategory} from '../../generated/graphql';
// import { ExpandableComponent } from "./components/expandable/expandable.component";
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CREATE_PHOTO = gql`
mutation CreatePhoto($picture: Upload!) {
  createPhoto(peopleCount: 2, hashtagIds: [], picture: $picture) {
    photo { id }
    errors
  }
}
`;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  picture: File;
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
  numPlacesMust:number;
  numPlacesHave:number;
  numSponsorsMust:number;
  numSponsorsHave:number;
  numCatchesMust:number;
  numCatchesHave:number;
  numHoursMust:number=5;
  numHoursHave:number=10;
  minNumber:number=3;
  photo: SafeResourceUrl;
  hashtagsInPhoto:Hashtag[];
  constructor(private sanitizer: DomSanitizer,
    private apollo: Apollo,

    ) {  }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: gql`
      query{
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
              category
              level{
                rank}

              }
            }
          }
        }`, 
      })
    .valueChanges.subscribe(result => {
      let viewer = result.data.viewer;
      this.group = viewer.group;
      this.hashtags=viewer.group.hashtags;
      this.hashtags.forEach(hashtag => hashtag['ischecked'] = false);
      this.hashtagsWiederholbar=this.hashtags.filter(hashtag=> hashtag.level.rank<= this.group.level.rank && (hashtag=>hashtag.repeatable||!hashtag.done));
      this.hashtagsLevel=this.hashtags.filter(hashtag=> hashtag.level.rank== this.group.level.rank);
      this.hashtagsNichtWiederholbar=this.hashtags.filter(hashtag=> hashtag.level.rank< this.group.level.rank&&hashtag.done && !(hashtag=>hashtag.repeatable));
      this.groupLevel=this.group.level.rank;
      this.catches=this.hashtags.filter(hashtag=>hashtag.category==HashtagCategory.Catch);
      this.places=this.hashtags.filter(hashtag=>hashtag.category==HashtagCategory.Place);
      this.sponsors=this.hashtags.filter(hashtag=>hashtag.category==HashtagCategory.Sponsor);
      this.numCatchesHave=this.catches.filter(hashtag=>hashtag.done).length;
      this.numPlacesHave=this.places.filter(hashtag=>hashtag.done).length;
      this.numSponsorsHave=this.sponsors.filter(hashtag=>hashtag.done).length;
      this.numCatchesMust=this.group.level.numCatches;
      this.numSponsorsMust=this.group.level.numSponsors;
      this.numPlacesMust=this.group.level.numPlaces;
    });
  }

  createPhoto() {
    this.apollo.mutate({
      mutation: CREATE_PHOTO,
      variables: {
        picture: this.picture
      },
      context: {
        useMultipart: true
      },
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  changePhoto(photo: File) {
    this.picture = photo;
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
  }
}
