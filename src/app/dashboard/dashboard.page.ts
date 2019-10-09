import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import TimeAgo from 'javascript-time-ago';
import de from 'javascript-time-ago/locale/de';
import { IonInfiniteScroll } from '@ionic/angular';
import {
  User, Group, Level, Photo, HashtagCategory, RallyeRating,
  DashboardQuery, DashboardQueryVariables, DashboardGQL,
  RallyeRatingsQuery, RallyeRatingsQueryVariables, RallyeRatingsGQL
} from '../../generated/graphql';
import { environment } from '../../environments/environment';

TimeAgo.addLocale(de);

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  viewerQueryRef: QueryRef<DashboardQuery, DashboardQueryVariables>;
  rallyeRatingsQueryRef: QueryRef<RallyeRatingsQuery, RallyeRatingsQueryVariables>;
  viewer: Partial<User>;
  group: Partial<Group>;
  level: Partial<Level>;
  photos: any[];
  photoLimit = 5;
  rallyeRatings: Partial<RallyeRating>[];
  rallyePoints: number;
  timeAgo = new TimeAgo('de-DE');
  categories = ['catches', 'places', 'sponsors', 'hours'];
  categoryLabels = {
    catches: 'Fang',
    [HashtagCategory.Catch]: 'Fang',
    places: 'Orte',
    [HashtagCategory.Place]: 'Ort',
    sponsors: 'Sponsoren',
    [HashtagCategory.Sponsor]: 'Sponsor',
    hours: 'Zeit zusammen'
  };
  categoryIcons = {
    catches: 'hand',
    [HashtagCategory.Catch]: 'hand',
    places: 'pin',
    [HashtagCategory.Place]: 'pin',
    sponsors: 'gift',
    [HashtagCategory.Sponsor]: 'gift',
    hours: 'hourglass'
  };

  constructor(
    private dashboardGQL: DashboardGQL,
    private rallyeRatingsGQL: RallyeRatingsGQL
  ) {
    this.viewerQueryRef = this.dashboardGQL.watch();
    this.rallyeRatingsQueryRef = this.rallyeRatingsGQL.watch();
  }

  loadData(event) {
    setTimeout(() => {
      this.photoLimit += 5;
      if (this.photoLimit >= this.photos.length) {
        event.target.disabled = true;
      }

      event.target.complete();
    }, 500);
  }

  ngOnInit() {
    this.viewerQueryRef.valueChanges.subscribe(({ data }) => {
      this.viewer = data.viewer;
      this.group = this.viewer.group;
      this.level = this.group.level;
      this.photos = this.group.photos;
      for (const photo of this.photos) {
        photo['fullPath'] = environment.backendUrl + photo.path;
        photo['dateString'] = this.timeAgo.format(new Date(photo.date));
      }
    });

    if (this.isRallye()) {
      this.rallyeRatingsQueryRef.valueChanges.subscribe(({ data }) => {
        this.rallyeRatings = data.viewer.group.rallyeRatings;
        this.rallyePoints = data.viewer.group.rallyePoints;
      });
    }
  }

  isRallye(): boolean {
    const now = new Date();
    return new Date('2019-10-04') < now && now < new Date('2019-10-05');
  }

  refresh(event) {
    this.viewerQueryRef.refetch()
      .then(() => event.target.complete())
      .catch(() => event.target.complete());
    if (this.isRallye()) {
      this.rallyeRatingsQueryRef.refetch()
        .then(() => event.target.complete())
        .catch(() => event.target.complete());
    }
  }

  numKey(key: string): string {
    return 'num' + key[0].toUpperCase() + key.slice(1);
  }

}
