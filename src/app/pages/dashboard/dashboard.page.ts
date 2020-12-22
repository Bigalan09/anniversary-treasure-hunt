import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
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
  error: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.anniversary = "2020-12-30 08:30:00";
    this.scheduleNotification();
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
    if (this.answer.toLowerCase() === "boob") {
      this.error = undefined;
      this.router.navigate(['/complete']);
    } else {
      this.error = "Invalid - Try again.";
    }
  }
}
