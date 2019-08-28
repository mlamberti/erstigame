import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CREATE_USER = gql`
mutation CreateUser($name: String!, $token: String!) {
  createUser(name: $name, groupToken: $token) {
    user {
      id
      name
      group {
        id
        name
      }
    }
    token
  }
}
`;

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {
  private form : FormGroup;

  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      token: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit() {}

  createUser() {
    console.log(this.form.value)
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.form.get('name').value,
        token: this.form.get('token').value
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

}
