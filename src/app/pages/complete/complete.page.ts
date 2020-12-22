import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.page.html',
  styleUrls: ['./complete.page.scss'],
})
export class CompletePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  find() {
    window.open("https://www.google.com/maps/search/?api=1&query=51.4039039,-3.5592016");
  }

}
