import { CompileTemplateMetadata } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Output() onComplete: EventEmitter<any> = new EventEmitter();
  @Input() anniversary: string;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  timer: any;
  anniversaryDate: Date;

  constructor() { }

  ngOnInit() {
    this.anniversaryDate = new Date(this.anniversary);
    this.run();
    this.timer = setInterval(() => { this.run(); }, 1000);
  }

  calculateDiff(dateSent) {
    let currentDate = new Date();
    dateSent = new Date(dateSent);

    return Math.floor(Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) - (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (100000 * 60));
  }

  run() {
    if (!this.isAnniversary()) {
      console.log(this.calculateDiff(this.anniversary));
      this.updateTimer(this.calculateDiff(this.anniversary));
    } else {
      this.complete();
    }
  }

  complete() {
    clearInterval(this.timer);
    this.onComplete.emit();
  }

  updateTimer(diff) {
    this.days = Math.floor(diff / 86400);
    const remainingDays = diff - (this.days * 86400);
    this.hours = Math.floor(remainingDays / 3600);
    const remainingHours = remainingDays - (this.hours * 3600);
    this.minutes = Math.floor(remainingHours / 60);
    this.seconds = diff % 60;

    if (diff <= 0) {
      this.complete();
    }
  }

  isAnniversary() {
    return new Date() >= this.anniversaryDate;
  }

}
