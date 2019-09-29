import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ModalController, ToastController } from '@ionic/angular';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { HashtagModalPage } from '../hashtag-modal/hashtag-modal.page';
import { User, HashtagCategory } from '../../generated/graphql';

const CREATE_PHOTO = gql`
mutation CreatePhoto($picture: Upload!, $peopleCount: Int!, $hashtagIds: [ID!]!) {
  createPhoto(picture: $picture, peopleCount: $peopleCount, hashtagIds: $hashtagIds) {
    photo { id }
    errors
  }
}`;

const QUERY_HASHTAGS = gql`
query {
  viewer {
    id
    group {
      id
      hashtagsAvailable {
        id
        doable
      }
    }
  }
}`;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit, AfterViewInit {
  @ViewChild('filePicker') filePicker: ElementRef;
  @ViewChild('peopleCountInput') peopleCountInput :ElementRef;
  picture: File;
  pictureURL: any;
  peopleCount:number = 0;
  numHashtags = 0;
  hashtagIds: string[] = [];

  constructor(
    private router: Router,
    private apollo: Apollo,
    public modalController: ModalController,
    public toastController: ToastController,
  ) {
    this.apollo.watchQuery<{ viewer: User }>({
      query: QUERY_HASHTAGS,
    }).valueChanges.subscribe(result => {
      let viewer = result.data.viewer;

      this.numHashtags = viewer.group.hashtagsAvailable.filter( hashtag => hashtag.doable ).length;
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.filePicker.nativeElement.click();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  createPhoto() {
    this.peopleCount=+this.peopleCountInput.nativeElement.value;
    console.log(this.peopleCount);
    console.log(typeof this.peopleCount);
    this.apollo.mutate({
      mutation: CREATE_PHOTO,
      variables: {
        picture: this.picture,
        peopleCount: this.peopleCount,
        hashtagIds: this.hashtagIds
      },
      context: {
        useMultipart: true
      },
    }).subscribe(
      ({ data }) => {
        console.log('got data', data);
      

        if (data.createPhoto.errors) {
          this.presentToast(data.createPhoto.errors)
        } else {
          this.router.navigate(['/']);
        }
      },(error) => {
        console.log('there was an error sending the query', error);
        this.presentToast(error)
      }
    );
  }

  changePhoto(file: File) {
    console.log("change");
    this.picture = file;

    let reader = new FileReader();
    reader.onload = (e) => {
      this.pictureURL = reader.result;
    }
    reader.readAsDataURL(file);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: HashtagModalPage
    });

    modal.onDidDismiss().then((res) => {
       this.hashtagIds = res.data.hashtagIds;
    });

    return await modal.present();
  }

}
