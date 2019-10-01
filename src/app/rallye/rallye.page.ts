import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { QueryRef } from 'apollo-angular';
import { ToastController } from '@ionic/angular';

import {
  Group, RallyeStation, RallyeRating,
  RallyeStationQuery, RallyeStationQueryVariables, RallyeStationGQL,
  CreateRallyeRatingGQL
} from '../../generated/graphql';

@Component({
  selector: 'app-rallye',
  templateUrl: './rallye.page.html',
  styleUrls: ['./rallye.page.scss'],
})
export class RallyePage implements OnInit {

  rallyeStationQueryRef: QueryRef<RallyeStationQuery, RallyeStationQueryVariables>;
  rallyeStation: Partial<RallyeStation>;
  groups: Partial<Group>;

  form: FormGroup;
  routeToken: string;

  constructor(
    private rallyeStationGQL: RallyeStationGQL,
    private createRallyeRatingGQL: CreateRallyeRatingGQL,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastController: ToastController,
  ) {
    this.form = this.formBuilder.group({
      token: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
    });

    this.form.valueChanges.subscribe(val => {
    });

  }

  ngOnInit() {
    this.routeToken = this.route.snapshot.paramMap.get('token');
    this.form.patchValue({ 'token': this.routeToken });
    this.login();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  login() {
    const token = this.form.controls.token.value;
    if ( token && token.length === 24 ) {
      this.rallyeStationQueryRef = this.rallyeStationGQL.watch({ token });
      this.rallyeStationQueryRef.valueChanges.subscribe(({ data }) => {
        this.rallyeStation = data.rallyeStation;
      });
    }
  }

  logout() {
    this.rallyeStation = undefined;
    this.form.patchValue({token: ''});
  }

  updatePoints(target) {
    this.createRallyeRatingGQL.mutate({
        groupId: target.name,
        stationToken: this.form.get('token').value,
        points: +target.value
      }).subscribe(
      ({ data }) => {
        if (data.createRallyeRating.errors) {
          this.presentToast(data.createRallyeRating.errors);
        } else {
          this.presentToast('Gespeichert');
        }
      },
      (error) => {
        this.presentToast(error);
      }
    );
  }

}
