import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BossPageRoutingModule } from './boss-routing.module';

import { BossPage } from './boss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BossPageRoutingModule
  ],
  declarations: [BossPage]
})
export class BossPageModule {}
