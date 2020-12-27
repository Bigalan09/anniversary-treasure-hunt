import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-boss',
  templateUrl: './boss.page.html',
  styleUrls: ['./boss.page.scss'],
})
export class BossPage implements OnInit {
  error: string = "";

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  async reveal(who: string) {
    if (who === 'alan') {
      this.error = "";
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Declaration',
        message: 'By clicking "Agree", you ("Sophie Olley"), agree that Alan wil be and is Boss #1 forever.',
        buttons: [
          {
            text: 'Agree',
            handler: (blah) => {
              this.router.navigate(['/complete']);
            }
          }
        ]
      });

      await alert.present();
    } else if (who === 'sophie') {
      this.error = `Incorrect - You are Boss #3`;
    } else if (who === 'baby') {
      this.error = `Incorrect - Our baby is Boss #2`;
    }
  }

}
