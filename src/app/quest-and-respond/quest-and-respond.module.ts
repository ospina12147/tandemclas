import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestAndRespondPageRoutingModule } from './quest-and-respond-routing.module';

import { QuestAndRespondPage } from './quest-and-respond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestAndRespondPageRoutingModule
  ],
  declarations: [QuestAndRespondPage]
})
export class QuestAndRespondPageModule {}
