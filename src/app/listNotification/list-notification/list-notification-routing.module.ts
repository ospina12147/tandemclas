import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNotificationPage } from './list-notification.page';

const routes: Routes = [
  {
    path: '',
    component: ListNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListNotificationPageRoutingModule {}
