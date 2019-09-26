import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { RallyeStation, RallyeRating, Group} from '../../generated/graphql';
@Component({
  selector: 'app-rallyepoints',
  templateUrl: './rallyepoints.page.html',
  styleUrls: ['./rallyepoints.page.scss'],
})
export class RallyepointsPage implements OnInit {
  rallyestation:RallyeStation;
  constructor() { }
  rallystand
  ngOnInit() {
/*    this.route.params.subscribe(params => {
      this.apollo.watchQuery<{ rallyestation:RallyeStation }>({
        query: gql`
        query{
          rallyestation (token: ${params.token}) {
            id
            name
              groups{
                id
                name
              }
            }
          }
        }
        mutation createrallypoints ($rallyestation: String!, $group: String!, $points: Int!) {
          createUser(rallyestation: $rallyestation, group: $group, points: $points) {

          }
        }
      })`, */
    }
  }
