import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendAssigmentModalPage } from './send-assigment-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SendAssigmentModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendAssigmentModalPageRoutingModule {}
