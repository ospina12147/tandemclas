import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetailsQuizPageRoutingModule } from './modal-details-quiz-routing.module';

import { ModalDetailsQuizPage } from './modal-details-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetailsQuizPageRoutingModule
  ],
  declarations: [ModalDetailsQuizPage]
})
export class ModalDetailsQuizPageModule {}
