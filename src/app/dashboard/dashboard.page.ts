import { Component, OnInit, ViewChild } from '@angular/core';
import { QueryRef } from 'apollo-angular';
import TimeAgo from 'javascript-time-ago'
import de from 'javascript-time-ago/locale/de'
import { IonInfiniteScroll } from '@ionic/angular';
import { User, Group, Level, Photo, DashboardQuery, DashboardQueryVariables, DashboardGQL } from '../../generated/graphql';
import { environment } from '../../environments/environment';

TimeAgo.addLocale(de)

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
        event.target.disabled = true;
    }, 500);
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

  refresh(event) {
    this.reporterQueryRef.refetch()
      .then(() => event.target.complete())
      .catch(() => event.target.complete());
  }

  numKey(key: string): string {
    return 'num' + key[0].toUpperCase() + key.slice(1);
  }

}
