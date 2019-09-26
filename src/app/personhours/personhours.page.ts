import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personhours',
  templateUrl: './personhours.page.html',
  styleUrls: ['./personhours.page.scss'],
})
export class PersonhoursPage implements OnInit {
  description:string= 'Für jedes Bild mit dem abstand von 1h erhaltet ihr pro Person auf dem Bild eine Stunde gutgeschreiben.  Ihr benötigt eine gewisse Anzahl an PersonenStunden um ins nächste Level aufzusteigen';
  info:string= 'um ein nächstes Level zu errreichen müsst ihr gemeinsam Zeit verbringen.';


  constructor() { }

  ngOnInit() {
  }

}
