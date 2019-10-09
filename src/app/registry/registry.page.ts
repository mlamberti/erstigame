import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PreloadAllModules, RouterModule, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController, IonSlides } from '@ionic/angular';
import { QueryRef } from 'apollo-angular';

import { environment } from '../../environments/environment';

import {
  GenderEnum,
  CreateGroupGQL,
  CreateUserGQL,
  GroupByTokenGQL
} from '../../generated/graphql';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.page.html',
  styleUrls: ['./registry.page.scss'],
})
export class RegistryPage implements OnInit, AfterViewInit {
  @ViewChild('slides') slides: IonSlides;

  genders = GenderEnum;

  tokenForm: FormGroup;
  groupForm: FormGroup;
  userForm: FormGroup;

  joinToken: string;
  groupName = '';
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private createUserGQL: CreateUserGQL,
    private createGroupGQL: CreateGroupGQL,
    private groupByTokenGQL: GroupByTokenGQL,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public toastController: ToastController,
    ) {
    this.tokenForm = this.formBuilder.group({
      token: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
    });
    this.groupForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: [''],
      info: [''],
    });

    this.tokenForm.valueChanges.subscribe(val => {
      if ( val.token && val.token.length === 24 ) {
        this.groupByTokenGQL.watch({ joinToken: val.token }).valueChanges.subscribe(({ data: { groupByToken } }) => {
          if ( groupByToken ) {
            this.groupName =  groupByToken.name;
            this.joinToken = val.token;
          } else {
            this.presentToast('Das Einladungstoken ist ungültig.');
          }
        });
      }
    });
  }

  ngOnInit() {
    this.joinToken = this.route.snapshot.paramMap.get('token');
    this.tokenForm.patchValue({ 'token': this.joinToken });
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
    if (!this.userForm.valid) {
      if (this.userForm.controls.name.errors.required) {
        this.presentToast('Bitte gib einen Namen an');
      }
      return;
    }

    this.createUserGQL.mutate({
      token: this.tokenForm.get('token').value || this.joinToken,
      name: this.userForm.get('name').value || null,
      gender: this.userForm.get('gender').value || null,
      info: this.userForm.get('info').value
    }).subscribe(
    ({ data }) => {
      if (data.createUser.errors) {
        this.presentToast(data.createUser.errors.join());
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

  goToCreateGroup() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
  }

  createGroup() {
    const groupName = this.groupForm.get('name').value;

    if ( groupName ) {
      this.createGroupGQL.mutate({
        name: groupName,
      }).subscribe(
      ({ data: { createGroup } }) => {
        if (createGroup.errors) {
          this.presentToast(createGroup.errors.join());
        } else {
          this.joinToken = createGroup.joinToken;
          this.groupName = createGroup.group.name;
          this.presentToast('Group created');
        }
      },
      (error) => {
        this.presentToast(error);
      });
    }
  }

}
