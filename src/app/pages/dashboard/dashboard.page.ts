import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
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
  anniversary2: string;
  answer: string;
  error: string = "";
  secondaryTimerComplete: boolean = true;
  secondary: string;
  timeUp: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {
  }

  ngOnInit() {
    let anniversaryDate = moment("2020-12-30 09:45:00");

    this.secondary = anniversaryDate.clone().add('-3', 'hours').format("YYYY-MM-DD HH:mm:ss");
    this.anniversary = anniversaryDate.clone().format("YYYY-MM-DD HH:mm:ss");
    let anniversary2 = anniversaryDate.clone().add('1', 'hour').add('30', 'minutes');
    this.anniversary2 = anniversary2.format("YYYY-MM-DD HH:mm:ss");

    if (anniversary2 <= moment()) {
      this.onTimesUp(true);
    }

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

  async onTimesUp(complete: boolean) {
    if (complete) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Time up!',
        message: 'I\'ll let you continue, but as a forfeit you will be having anal without lube!',
        buttons: [
          {
            text: 'Okay',
            handler: (blah) => {
              this.timeUp = true;
            }
          }
        ]
      });

      await alert.present();
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
          sound: "beep.wav",
          attachments: null,
          actionTypeId: "",
          extra: null
        }
      ]
    });
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Anniversary Treasure Hunt",
          body: "It\'s almost time for the quest!",
          id: 2,
          schedule: { at: new Date(this.secondary) },
          sound: "beep.wav",
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
