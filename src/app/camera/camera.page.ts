import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
      hashtags {
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
  picture: File;
  pictureURL: any;
  peopleCount = 0;
  numHashtags = 0;
  hashtagIds: string[] = [];

  constructor(private apollo: Apollo, public modalController : ModalController) {     this.apollo
    .watchQuery<{ viewer: User }>({
      query: QUERY_HASHTAGS,
    })
    .valueChanges.subscribe(result => {
      let viewer = result.data.viewer;

      this.numHashtags = viewer.group.hashtags.filter( hashtag => hashtag.doable ).length;
    }); }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.filePicker.nativeElement.click();
  }

  createPhoto() {
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
    }).subscribe(({ data }) => {
      console.log('got data', data);
      window.location.href = '/tabs/dashboard';   
    },(error) => {
      console.log('there was an error sending the query', error);
    });
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
