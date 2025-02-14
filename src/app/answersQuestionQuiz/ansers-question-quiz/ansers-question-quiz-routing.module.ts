import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnsersQuestionQuizPage } from './ansers-question-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: AnsersQuestionQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnsersQuestionQuizPageRoutingModule {}
