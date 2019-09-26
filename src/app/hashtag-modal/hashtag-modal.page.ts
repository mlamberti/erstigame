import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ModalController, IonCheckbox, IonSelect } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { User, Hashtag, Group, HashtagCategory } from '../../generated/graphql';

const QUERY_VIEWER = gql`
query {
  viewer {
    id
    group {
      id
      level {
        id
        rank
        numHours
        numPlaces
        numCatches
        numSponsors
      }
      hashtags {
        id
        name
        doable
        category
        level {
          id
          rank
        }
      }
    }
  }
}
`;


@Component({
  selector: 'app-hashtag-modal',
  templateUrl: './hashtag-modal.page.html',
  styleUrls: ['./hashtag-modal.page.scss'],
})
export class HashtagModalPage implements OnInit {
   @ViewChildren('checkbox') checkboxes: QueryList<IonCheckbox>;
   @ViewChildren('select') selects: QueryList<IonSelect>;

  viewer:User;
  group: Group;

  allHashtags: Hashtag[];
  hashtags: Hashtag[];
  hashtagCategories = {
    catches: [],
    places: [],
    sponsors: [],
  }

  constructor(private apollo: Apollo, public modalController : ModalController) { }

  ngOnInit() {
    this.apollo
    .watchQuery<{ viewer: User }>({
      query: QUERY_VIEWER,
    })
    .valueChanges.subscribe(result => {
      let viewer = result.data.viewer;
      this.group = viewer.group;

      this.allHashtags = viewer.group.hashtags.filter( hashtag => hashtag.doable );

      this.hashtagCategories.catches  = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Catch);
      this.hashtagCategories.places   = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Place);
      this.hashtagCategories.sponsors = this.allHashtags.filter( hashtag => hashtag.category == HashtagCategory.Sponsor);

      this.hashtags = this.allHashtags.filter( hashtag => hashtag.category === null)
    });
  }

  async dismissModal() {
    let hashtagIds = [];

    this.checkboxes.forEach(el => {
      if(el.checked) hashtagIds.push(el.name);
    });
    this.selects.forEach(el => {
      Array.prototype.push.apply(hashtagIds, el.value);
    });

    await this.modalController.dismiss({
      'hashtagIds': hashtagIds,
    });
  }
}
