import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-rallyepoints',
  templateUrl: './rallyepoints.page.html',
  styleUrls: ['./rallyepoints.page.scss'],
})
export class RallyepointsPage implements OnInit {

  constructor() { }

  ngOnInit() {

    this.apollo
    .watchQuery<{ viewer }>({
      query: gql`
      query{
        viewer{
          id
          rally
        }

      }
    })`, 
  }
}
