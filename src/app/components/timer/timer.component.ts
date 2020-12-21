import * as moment from 'moment'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Output() onComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() anniversary: string;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  timer: any;
  anniversaryDate: moment.Moment;

  constructor() { }

  ngOnInit() {
    this.run();
    this.timer = setInterval(() => { this.run(); }, 1000);
  }

  calculateDiff(eventDate: moment.Moment) {
    const now = moment();
    const diff = eventDate.diff(now);
    return moment.duration(diff, 'milliseconds');
  }

  run() {
    this.anniversaryDate = moment(this.anniversary);

    if (!this.isAnniversary()) {
      const duration = this.calculateDiff(this.anniversaryDate);
      this.updateTimer(duration);
    } else {
      this.complete();
    }
  }

  complete() {
    clearInterval(this.timer);
    this.onComplete.emit(true);
  }

  updateTimer(diff) {
    this.days = diff.days();
    this.hours = diff.hours();
    this.minutes = diff.minutes();
    this.seconds = diff.seconds();

    if (diff <= 0) {
      this.complete();
    }
  }

  isAnniversary() {
    return moment() >= this.anniversaryDate;
  }

}
