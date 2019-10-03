import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, IonSlides } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';

import { environment } from '../../environments/environment';

import {
  GenderEnum,
  CreateUserMutation, CreateUserMutationVariables, CreateUserGQL,
  GroupByTokenQuery, GroupByTokenQueryVariables, GroupByTokenGQL
} from '../../generated/graphql';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit, AfterViewInit {
  @ViewChild('slides') slides: IonSlides;

  groupByTokenQueryRef: QueryRef<GroupByTokenQuery, GroupByTokenQueryVariables>;
  createUserQueryRef: QueryRef<CreateUserMutation, CreateUserMutationVariables>;
  genders = GenderEnum;

  form: FormGroup;
  groupToken: string;
  groupName = '';
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private createUserGQL: CreateUserGQL,
    private groupByTokenGQL: GroupByTokenGQL,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
  ) {
    this.form = this.formBuilder.group({
      token: ['', Validators.required],
      name: ['', Validators.required],
      gender: [''],
      info: [''],
    });

    this.form.valueChanges.subscribe(val => {
      if ( val.token && val.token.length === 24 ) {
        this.groupByTokenGQL.watch({ joinToken: val.token }).valueChanges.subscribe(({ data }) => {
          this.groupName = data.groupByToken ? data.groupByToken.name : '';
          if ( this.groupName ) {
            this.slides.lockSwipes(false);
          } else {
            this.slides.lockSwipes(true);
          }
        });
      } else {
        this.groupName = '';
        this.slides.lockSwipes(true);
      }
    });
  }

  ngOnInit() {
    this.groupToken = this.route.snapshot.paramMap.get('token');
    this.form.patchValue({ 'token': this.groupToken });
  }

  ngAfterViewInit() {
    this.slides.lockSwipes(true);
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
        name: this.form.get('name').value || null,
        token: this.form.get('token').value,
        gender: this.form.get('gender').value || null,
        info: this.form.get('info').value
      }).subscribe(
      ({ data }) => {
        if (data.createUser.errors) {
          this.presentToast(data.createUser.errors);
        } else {
          localStorage.setItem('authToken', data.createUser.authToken);
          window.location.href = environment.frontendUrl + '/tabs/group';
        }
      },
      (error) => {
        this.presentToast(error);
      }
    );
  }

}
