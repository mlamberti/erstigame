import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, Group, Level, Hashtag, HashtagCategory} from '../../generated/graphql';
import { ExpandableComponent } from "../components/expandable/expandable.component";

const QUERY_VIEWER = gql`
query{
  viewer {
    id
    group {
      id
      numHours, numCatches, numPlaces, numSponsors
      level {
        id,
        rank,
        requiredHashtags { id, name, done }
        numCatches, numPlaces, numSponsors, numHours
      }
      hashtagsAvailable {
        id
        name
        info
        points
        repeatTime
        repeatable
        done
        category
        level { id, rank }
      }
    }
  }
}`;

@Component({
  selector: 'app-hashtags',
  templateUrl: 'hashtags.page.html',
  styleUrls: ['hashtags.page.scss']
})
export class HashtagsPage implements OnInit {
  loading = true;
  viewer: User;
  group: Group;
  level: Level;

  allHashtags: Hashtag[];
  hashtags: Hashtag[];
  hashtagCategories = {
    catches: [],
    places: [],
    sponsors: [],
  };
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

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: QUERY_VIEWER
    }).valueChanges.subscribe(({data}) => {
      this.viewer = data.viewer;
      this.group = this.viewer.group;
      this.level = this.group.level;

      this.allHashtags = this.group.hashtagsAvailable;

      this.hashtagCategories.catches  = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Catch);
      this.hashtagCategories.places   = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Place);
      this.hashtagCategories.sponsors = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Sponsor);

      this.hashtags = this.allHashtags.filter( hashtag => hashtag.category === null);
      this.hashtags.sort((a,b) => +a.done - +b.done);

      this.loading = false;
    });
  }

  numKey(key: string): string {
    return 'num' + key[0].toUpperCase() + key.slice(1);
  }

}
