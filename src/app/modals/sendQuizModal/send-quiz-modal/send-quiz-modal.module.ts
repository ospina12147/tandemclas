import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendQuizModalPageRoutingModule } from './send-quiz-modal-routing.module';

import { SendQuizModalPage } from './send-quiz-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SendQuizModalPageRoutingModule
  ],
  declarations: [SendQuizModalPage]
})
export class SendQuizModalPageModule {}
