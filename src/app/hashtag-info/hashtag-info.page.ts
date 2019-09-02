import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { Hashtag } from '../../generated/graphql';

@Component({
  selector: 'app-hashtag-info',
  templateUrl: './hashtag-info.page.html',
  styleUrls: ['./hashtag-info.page.scss'],
})
export class HashtagInfoPage implements OnInit {
  hashtag: Hashtag;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apollo.watchQuery<{ hashtag: Hashtag }>({
        query: gql`
          query{
          hashtag(id: ${params.id}) {
            id
            name
            info
            description
            picture
            points
            repeatTime
          }
        }
        `,
      })
      .valueChanges.subscribe(result => {
        this.hashtag = result.data.hashtag;
      });
    });
  }

}
