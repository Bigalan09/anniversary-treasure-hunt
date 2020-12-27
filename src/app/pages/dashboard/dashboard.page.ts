import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import * as moment from 'moment';
const { LocalNotifications } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  countdownComplete: boolean = false;
  anniversary: string;
  answer: string;
  error: string = "";
  secondaryTimerComplete: boolean = true;
  secondary: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.anniversary = "2020-12-30 10:00:00";
    this.secondary = "2020-12-30 05:00:00";
    this.scheduleNotification();
    this.doTimer();
  }

  doTimer() {
    const now = moment();
    const diff = moment(this.secondary).diff(now);
    const duration: any = moment.duration(diff, 'milliseconds')
    this.secondaryTimerComplete = duration <= 0;

    if (!this.secondaryTimerComplete) {
      setTimeout(() => {
        this.doTimer();
      }, 1000);
    }
  }

  async scheduleNotification() {
    await LocalNotifications.requestPermission();
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Anniversary Treasure Hunt",
          body: "It\'s Time! Your quest for treasure has begin!",
          id: 1,
          schedule: { at: new Date(this.anniversary) },
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
  }

  onCountdownComplete(complete: boolean) {
    this.countdownComplete = complete;
  }

  async send() {
    if (this.answer.toLowerCase().replace(/\s/g, '') === "sophie") {
      this.error = undefined;
      this.router.navigate(['/boss']);
    } else {
      this.error = "Invalid - Try again.";
    }
  }
}
