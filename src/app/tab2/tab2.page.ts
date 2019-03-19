import { Component } from '@angular/core';
import { USERS } from '../MOCK-USERS';
import {ACTIVITYS} from'../MOCK-ACTIVITYS';
import {ITimer} from '../itimer';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'] 
})
export class Tab2Page {
  users = USERS;
  activitys=ACTIVITYS;
  public data: boolean=false;
  public dateTime : string = '';
  public changeCheckBox() {
    if(this.data) {
      this.dateTime = new Date();
    }
  }

 timeInSeconds: number=10;
    public timer: ITimer;
 
    constructor() {
    }
 
    ngOnInit() {
        this.initTimer();
        this.timer.hasStarted = true;
        this.timer.runTimer = true;
        this.timerTick();
    }
 
    initTimer() {
        if(!this.timeInSeconds) { this.timeInSeconds = 0; }
 
        this.timer = <ITimer>{
            seconds: this.timeInSeconds,
            secondsRemaining: this.timeInSeconds
        };
 
        this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
    }
    
    timerTick() {
        setTimeout(() => {
            if (!this.timer.runTimer) { return; }
            this.timer.secondsRemaining--;
            this.timer.displayTime = this.getSecondsAsDigitalClock(this.timer.secondsRemaining);
            if (this.timer.secondsRemaining > 0) {
                this.timerTick();
            }
            else {
                this.timer.hasFinished = true;
            }
        }, 1000);
    }
 
    getSecondsAsDigitalClock(inputSeconds: number) {
        var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var hoursString = '';
        var minutesString = '';
        var secondsString = '';
        hoursString = (hours < 10) ? "0" + hours : hours.toString();
        minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
        secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
        return hoursString + ':' + minutesString + ':' + secondsString;
    }
}
  

