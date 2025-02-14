import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TryQuestPage } from './try-quest.page';

const routes: Routes = [
  {
    path: '',
    component: TryQuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TryQuestPageRoutingModule {}
