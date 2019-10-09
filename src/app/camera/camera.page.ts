import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController, IonDatetime } from '@ionic/angular';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import { finalize } from 'rxjs/operators';

import { NgxPicaService } from '@digitalascetic/ngx-pica';

import { HashtagModalComponent } from '../hashtag-modal/hashtag-modal.component';
import {
  User, HashtagCategory,
  DashboardQuery, DashboardQueryVariables, DashboardGQL,
} from '../../generated/graphql';

const CREATE_PHOTO = gql`
mutation CreatePhoto($picture: Upload!, $peopleCount: Int!, $date: ISO8601DateTime, $hashtagIds: [ID!]!) {
  createPhoto(picture: $picture, peopleCount: $peopleCount, date: $date, hashtagIds: $hashtagIds) {
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
  @ViewChild('peopleCountInput') peopleCountInput: ElementRef;
  @ViewChild('datetimeInput') datetimeInput: IonDatetime;
  viewerQueryRef: QueryRef<DashboardQuery, DashboardQueryVariables>;
  viewer: Partial<User>;
  sending = false;

  picture: File;
  pictureURL: any;
  peopleCount = 0;
  currentDate = new Date();
  currentDateString: string;
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
    this.currentDate.setMinutes(this.currentDate.getMinutes() - this.currentDate.getTimezoneOffset());
    this.currentDateString = this.currentDate.toISOString().slice(0, -1);
  }

  ngOnInit() {
    this.viewerQueryRef.valueChanges.subscribe(({ data }) => {
      this.viewer = data.viewer;
      this.numHashtags = this.viewer.group.hashtagsAvailable.filter( hashtag => hashtag.doable ).length;
      const photos = this.viewer.group.photos;
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
    if (this.sending) { return; }
    this.sending = true;

    const date = new Date(this.datetimeInput.value);
    console.log(date);

    this.apollo.mutate<{ createPhoto }>({
      mutation: CREATE_PHOTO,
      variables: {
        picture: this.picture,
        peopleCount: +this.peopleCountInput.nativeElement.value,
        date: date,
        hashtagIds: this.hashtagIds
      },
      context: {
        useMultipart: true
      },
    }).pipe(
      finalize(() => this.sending = false)
    ).subscribe(({ data: { createPhoto } }) => {
        if (createPhoto.errors) {
          this.presentToast(createPhoto.errors);
        } else {
          this.dashboardGQL.watch().refetch();
          this.router.navigate(['/']);
        }
      }, (error) => {
        this.presentToast(error);
      }
    );
  }

  changePhoto(file: File) {
    this.picture = file;

    this.picaService.resizeImage(file, 1200, 1200, { aspectRatio: { keepAspectRatio: true } })
      .subscribe(
        (imageResized: File) => {
          const reader: FileReader = new FileReader();

          reader.onload = (e) => {
            this.pictureURL = reader.result;
          };

          reader.readAsDataURL(imageResized);
        }
      );
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: HashtagModalComponent
    });

    modal.onDidDismiss().then((res) => {
       this.hashtagIds = res.data.hashtagIds;
    });

    return await modal.present();
  }

}
