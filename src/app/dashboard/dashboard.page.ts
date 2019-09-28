import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'

import { User, Group, Level, Photo } from '../../generated/graphql';
import { environment } from '../../environments/environment';

TimeAgo.addLocale(de)

const QUERY_VIEWER = gql`
query {
  viewer {
    id
    name
    group {
      id
      name
      points
      numCatches
      numPlaces
      numSponsors
      numHours
      level {
        id,
        rank,
        requiredHashtags { id, name, done }
        numCatches, numPlaces, numSponsors, numHours
      }
      photos {
        id
        user { id, name, picture }
        hashtags { id, name }
        points
        path
        createdAt
      }
    }
  }
}`;

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  viewer: User;
  group: Group;
  level: Level;
  photos: Photo[];
  timeAgo = new TimeAgo('de-DE')

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: QUERY_VIEWER
    }).valueChanges.subscribe(({ data }) => {
      this.viewer = data.viewer;
      this.group = this.viewer.group;
      this.level = this.group.level
      this.photos = this.viewer.group.photos.sort((a,b) => Date.parse(b.createdAt)-Date.parse(a.createdAt));
      for (let photo of this.photos) {
        photo.path=environment.backendUrl+photo.path;
        photo['dateString'] = this.timeAgo.format(new Date(photo.createdAt));
      }

    });
  }

}
