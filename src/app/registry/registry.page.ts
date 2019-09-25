import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from "@angular/router"; //  Für Token auslesen
import { switchMap } from 'rxjs/operators'; // für token auslesen
import { GenderEnum} from '../../generated/graphql';
const CREATE_USER = gql`
mutation CreateUser($name: String!, $token: String!, $gender: Number!,$info: String! ) {
  createUser(name: $name, groupToken: $token ,gender: $gender, info: $info) {
    user {
      id
      name
      gender
      info
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
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {
  private form : FormGroup;
  genders=GenderEnum;

  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  groupToken:String;
  constructor(
    private apollo: Apollo, 
    private formBuilder: FormBuilder,  
    private route: ActivatedRoute, 
    private router: Router,
    ) {
    
    this.form = this.formBuilder.group({
      token: ['', Validators.required],
      name: ['', Validators.required],
      gender: [''],
      info:[''],
    });
     ;  
  }

  ngOnInit() {
     this.groupToken = this.route.snapshot.paramMap.get('token');
     console.log (this.groupToken);
     this.form.patchValue({'token': this.groupToken});
    // if (groupToken){
    // this.form.token= this.groupToken
    // }
  }

  createUser() {
    console.log(this.form.value)
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.form.get('name').value,
        token: this.form.get('token').value,
        gender: this.form.get('gender').value,
        info: this.form.get('info').value
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
    window.location.href = '/tabs/group';
  }

}
