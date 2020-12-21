import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

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

  constructor() { }

  ngOnInit() {
    this.anniversary = "2020-12-30 08:00:00";
  }

  onCountdownComplete(complete: boolean) {
    this.countdownComplete = complete;
  }

  async send() {
    if (this.answer.toLowerCase() === "boob") {
      this.error = undefined;
      window.open("https://www.google.com/maps/search/?api=1&query=51.4039039,-3.5592016")
    } else {
      this.error = "Invalid - Try again.";
    }
  }
}
