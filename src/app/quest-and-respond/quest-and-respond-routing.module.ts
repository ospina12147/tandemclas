import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestAndRespondPage } from './quest-and-respond.page';

const routes: Routes = [
  {
    path: '',
    component: QuestAndRespondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestAndRespondPageRoutingModule {}
