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

  points = [3,0,1,9,6,0];
  hashtags: Hashtag[];
  groupName: String;
  users: User[];
  photos: Photo[];
  date=Date.now();
  latestPhoto: Photo;
  timeLatestPhoto=Date.now();
  time= Date.now();

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
      this.groupName = viewer.group.name;
      this.users = viewer.group.users;
      this.hashtags = viewer.group.hashtags

           let pointsLast=100;
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
