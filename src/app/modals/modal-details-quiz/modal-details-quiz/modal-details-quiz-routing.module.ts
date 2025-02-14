import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetailsQuizPage } from './modal-details-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetailsQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetailsQuizPageRoutingModule {}
