import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewievsPageRoutingModule } from './rewievs-routing.module';

import { RewievsPage } from './rewievs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewievsPageRoutingModule
  ],
  declarations: [RewievsPage]
})
export class RewievsPageModule {}
