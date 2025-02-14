import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListAssigmentPage } from './list-assigment.page';

const routes: Routes = [
  {
    path: '',
    component: ListAssigmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAssigmentPageRoutingModule {}
