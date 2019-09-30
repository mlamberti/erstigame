import { Component, OnInit ,ElementRef , QueryList, ViewChildren} from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { RallyeStation, Group, User} from '../../generated/graphql';
import {PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from "@angular/router"; //  Für Token auslesen

const CREATE_RALLYEPOINTS = gql`
mutation CreateRallyePoints($picture: Upload!, $peopleCount: Int!, $hashtagIds: [ID!]!) {
  createRallyePoints (groupId: $group,  pointsCount: $pointsCount, ) {
    photo { id }
    errors
  }
}`;


const QUERY_GROUPS = gql`
query {
  viewer {
    id
    group {
      id
      name
    }
  }
}`;

@Component({
  selector: 'app-rallyepoints',
  templateUrl: './rallyepoints.page.html',
  styleUrls: ['./rallyepoints.page.scss'],
})
export class RallyepointsPage implements OnInit {
  rallyestation:RallyeStation;
  viewer:User;
  group:Group;
  pointsCount:Number=0;
  @ViewChildren("pointsCountInput") pointsCountInputs !: QueryList<ElementRef>;
  rallyStationToken:String;
  groups: Group[];
  constructor(
        private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    ) { 
   this.apollo.watchQuery<{ viewer: User }>({
      query: QUERY_GROUPS,
    }).valueChanges.subscribe(result => {
      this.viewer = result.data.viewer;
      console.log(this.viewer);
      this.groups=[this.viewer.group];
          console.log(this.groups);
    });
  }

  
  ngOnInit() {
    this.rallyStationToken = this.route.snapshot.paramMap.get('token');
    console.log(this.rallyStationToken)

  }
  
  createRallyePoints (){
    this.pointsCountInputs.forEach(el=>{
      console.log(el.nativeElement.value)
    })

  }

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
