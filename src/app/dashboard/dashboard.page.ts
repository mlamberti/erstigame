import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User, Hashtag, Photo } from '../../generated/graphql';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {

  points: Number = 200535;
  digits: Number[];
  pointsstring:String= "12345";
  hashtags: Hashtag[];
  groupName: String;
  groupPoints:Number;
  users: User[];
  photos: Photo[];
  date=Date.now();
  latestPhoto: Photo;
  timeLatestPhoto=Date.now();
  time= Date.now();
  announcement:String= "Verhalte dich immer Vorbildlich... Du weißt nie wer dir Bonus Punkte für gute Taten gibt.";
  pointsNow: number;
  pointsLast:number;

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
            photos {
              id
              user {
                id
                name
                picture
              }
              createdAt
              path
              hashtags {
                name
                id
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
      }
    

      `,
    })
    .valueChanges.subscribe(result => {
      console.log(result);
      let viewer = result.data.viewer;
      this.photos=viewer.group.photos;
      this.groupPoints=viewer.group.points;
      this.groupName = viewer.group.name;
      this.users = viewer.group.users;
      this.hashtags = viewer.group.hashtags
      //this.pointsstring=viewer.group.points.toString();
      this.digits = (""+this.pointsstring).split("").map(Number);
/*
 this.latestPhoto=viewer.group.photo.filter(photo => photo.id(Math.max(photo.id)));
this.timeLatestPhoto=this.latestPhoto.createdAt;
      this.pointsLast= viewer.group.points;
      if (this.timeLatestPhoto.gettime()- this.time.gettime()<= 30*60*1000) {
        let pointsNow=pointsLast+5
      }

      if (this.timeLatestPhoto.gettime()- this.time.gettime()> 30*60*1000 && this.timeLatestPhoto.gettime()- this.time.gettime()<= 60*60*1000) {
        let pointsNow=pointsLast+10;
      }
      if (this.timeLatestPhoto.gettime()- this.time.gettime()> 60*60*1000) {
        let pointsNow=pointsLast+15;
      }
*/
});
  }

}
