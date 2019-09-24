import { Component, OnInit } from '@angular/core';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from "@angular/router"; //  Für Token auslesen
import { switchMap } from 'rxjs/operators'; // für token auslesen
const ADD_GROUP_RALLY_RATING = gql`
mutation AddGroupRallyeRating($token: String!,) {
  addGroupRallyeRating(token: $token) {
    user {
      id
      name
      group {
        id
        name
      }
    }
    token
    errors
  }
}
`;

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {
  token:String='';
  constructor(
        private apollo: Apollo, 
    private route: ActivatedRoute, 
    private router: Router,
    ) { }

  ngOnInit() {
   let token = this.route.snapshot.paramMap.get('token');
   console.log (token);
  }
  getRallyPoints() {
    this.apollo.mutate({
      mutation: ADD_GROUP_RALLY_RATING,
      variables: {
        token: this.token
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
    {path: '/tabs/dashboard'}
  }


}
