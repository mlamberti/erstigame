import { Component, OnInit } from '@angular/core';
import {PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from "@angular/router"; //  Für Token auslesen
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';

import { GenderEnum} from '../../generated/graphql';
import { CreateUserMutation, CreateUserMutationVariables, CreateUserGQL } from '../../generated/graphql';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit {
  reporterQueryRef: QueryRef<CreateUserMutation, CreateUserMutationVariables>;
  genders = GenderEnum;

  form: FormGroup;
  groupToken: string;
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private createUserGQL: CreateUserGQL,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
  ) {
    this.form = this.formBuilder.group({
      token: ['', Validators.required],
      name: ['', Validators.required],
      gender: [''],
      info:[''],
    });
  }

  ngOnInit() {
    this.groupToken = this.route.snapshot.paramMap.get('token');
    this.form.patchValue({ 'token': this.groupToken });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  createUser() {
    if (!this.form.valid) {
      if (this.form.controls.name.errors.required) {
        this.presentToast('Bitte gib einen Namen an');
      }
      return;
    }

    this.createUserGQL.mutate({
        name: this.form.get('name').value||null,
        token: this.form.get('token').value,
        gender: this.form.get('gender').value ||null,
        info: this.form.get('info').value
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
      },
      (error) => {
        console.log('there was an error sending the query', error);
        this.presentToast(error)
      }
    );
  }

}
