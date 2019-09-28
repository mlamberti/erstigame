import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, Hashtag, Group, HashtagCategory} from '../../generated/graphql';
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
      hashtags{
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

  allHashtags: Hashtag[];
  hashtags: Hashtag[];
  hashtagCategories = {
    catches: [],
    places: [],
    sponsors: [],
  };
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

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer }>({
      query: QUERY_VIEWER
    }).valueChanges.subscribe(({data}) => {
      this.viewer = data.viewer;
      this.group = this.viewer.group;

      this.allHashtags = this.group.hashtags;

      this.hashtagCategories.catches  = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Catch);
      this.hashtagCategories.places   = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Place);
      this.hashtagCategories.sponsors = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Sponsor);

      this.hashtags = this.allHashtags.filter( hashtag => hashtag.category === null);

      this.loading = false;
    });
  }

}
