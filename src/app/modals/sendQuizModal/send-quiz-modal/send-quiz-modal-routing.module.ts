import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendQuizModalPage } from './send-quiz-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SendQuizModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendQuizModalPageRoutingModule {}
