import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from "@angular/router"; //  Für Token auslesen
import { switchMap } from 'rxjs/operators'; // für token auslesen
import { GenderEnum} from '../../generated/graphql';
import { ToastController } from '@ionic/angular';
const CREATE_USER = gql`
mutation CreateUser($name: String!, $token: String!, $gender: GenderEnum, $info: String) {
  createUser(name: $name, groupToken: $token, gender: $gender, info: $info) {
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
    authToken
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
  groupToken:string;
  constructor(
    public toastController: ToastController,
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

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
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
    if (!this.form.valid) return;
    console.log(this.form.value)
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        name: this.form.get('name').value||null,
        token: this.form.get('token').value,
        gender: this.form.get('gender').value ||null,
        info: this.form.get('info').value
      }
    }).subscribe(
    ({ data }) => {
      console.log('got data', data);
      if (data.createUser.errors) {
        this.presentToast(data.createUser.errors)
      } else {
        localStorage.setItem('authToken', data.createUser.authToken);
        console.log(data.createUser.authToken)
        window.location.href = '/tabs/group';    
      }
    },(error) => {
      console.log('there was an error sending the query', error);
      this.presentToast(error)
    });
    
  }

}
