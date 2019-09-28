import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryRef } from 'apollo-angular';

import { User, Group, Level, Photo, Hashtag } from '../../generated/graphql';
import { HashtagInfoQuery, HashtagInfoQueryVariables, HashtagInfoGQL } from '../../generated/graphql';

@Component({
  selector: 'app-hashtag-info',
  templateUrl: './hashtag-info.page.html',
  styleUrls: ['./hashtag-info.page.scss'],
})
export class HashtagInfoPage implements OnInit {
  hashtag: Hashtag;
  reporterQueryRef: QueryRef<HashtagInfoQuery, HashtagInfoQueryVariables>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hashtagInfoGQL: HashtagInfoGQL,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ hashtagId }) => {
      this.reporterQueryRef = this.hashtagInfoGQL.watch({ hashtagId });
      this.reporterQueryRef.valueChanges.subscribe(({data}) => {
        this.hashtag = data.hashtag;
      });
    });
  }
}
