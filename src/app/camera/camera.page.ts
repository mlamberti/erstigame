import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { ModalController, ToastController } from '@ionic/angular';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

import { NgxPicaService } from '@digitalascetic/ngx-pica';

import { HashtagModalPage } from '../hashtag-modal/hashtag-modal.page';
import {
  User, HashtagCategory,
  DashboardQuery, DashboardQueryVariables, DashboardGQL,
} from '../../generated/graphql';

const CREATE_PHOTO = gql`
mutation CreatePhoto($picture: Upload!, $peopleCount: Int!, $hashtagIds: [ID!]!) {
  createPhoto(picture: $picture, peopleCount: $peopleCount, hashtagIds: $hashtagIds) {
    photo { id }
    errors
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
  viewerQueryRef: QueryRef<DashboardQuery, DashboardQueryVariables>;
  viewer: Partial<User>;

  picture: File;
  pictureURL: any;
  peopleCount = 0;
  numHashtags = 0;
  hashtagIds: string[] = [];

  constructor(
    private apollo: Apollo,
    private dashboardGQL: DashboardGQL,
    private router: Router,
    public modalController: ModalController,
    public toastController: ToastController,
    private picaService: NgxPicaService
  ) {
    this.viewerQueryRef = this.dashboardGQL.watch();
  }

  ngOnInit() {
    this.viewerQueryRef.valueChanges.subscribe(({ data }) => {
      this.viewer = data.viewer;
      this.numHashtags = this.viewer.group.hashtagsAvailable.filter( hashtag => hashtag.doable ).length;
      let photos = this.viewer.group.photos;
      this.peopleCount = photos.length ? photos[0].peopleCount : 0;
    });
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
    this.apollo.mutate({
      mutation: CREATE_PHOTO,
      variables: {
        picture: this.picture,
        peopleCount: +this.peopleCountInput.nativeElement.value,
        hashtagIds: this.hashtagIds
      },
      context: {
        useMultipart: true
      },
    }).subscribe(
      ({ data }) => {
        if (data.createPhoto.errors) {
          this.presentToast(data.createPhoto.errors)
        } else {
          this.dashboardGQL.watch().refetch();
          this.router.navigate(['/']);
        }
      },(error) => {
        this.presentToast(error)
      }
    );
  }

  changePhoto(file: File) {
    this.picture = file;

    this.picaService.resizeImage(file, 1200, 1200, { aspectRatio: { keepAspectRatio: true } })
      .subscribe(
        (imageResized: File) => {
          let reader: FileReader = new FileReader();
               
          reader.onload = (e) => {
            this.pictureURL = reader.result;
          };
                  
          reader.readAsDataURL(imageResized);
        }
      );
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
