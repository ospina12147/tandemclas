import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnsersQuestionQuizPageRoutingModule } from './ansers-question-quiz-routing.module';

import { AnsersQuestionQuizPage } from './ansers-question-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnsersQuestionQuizPageRoutingModule
  ],
  declarations: [AnsersQuestionQuizPage]
})
export class AnsersQuestionQuizPageModule {}
