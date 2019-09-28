import { Component, OnInit } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'

import { User, Group, Level, Photo, DashboardQuery, DashboardQueryVariables, DashboardGQL } from '../../generated/graphql';
import { environment } from '../../environments/environment';

TimeAgo.addLocale(de)

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  viewer: Partial<User>;
  group: Partial<Group>;
  level: Partial<Level>;
  photos: Partial<Photo[]>;
  timeAgo = new TimeAgo('de-DE')
  reporterQueryRef: QueryRef<DashboardQuery, DashboardQueryVariables>;
  categories = ['catches', 'places', 'sponsors', 'hours'];
  categoryLabels = {
    catches: 'Fang',
    places: 'Orte',
    sponsors: 'Sponsoren',
    hours: 'Zeit zusammen'
  };
  categoryIcons = {
    catches: 'hand',
    places: 'pin',
    sponsors: 'gift',
    hours: 'hourglass'
  };

  constructor(private dashboardGQL: DashboardGQL) {
    this.reporterQueryRef = this.dashboardGQL.watch();
  }

  ngOnInit() {
    this.reporterQueryRef.valueChanges.subscribe(({ data }) => {
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

  numKey(key: string): string {
    return 'num' + key[0].toUpperCase() + key.slice(1);
  }

}
