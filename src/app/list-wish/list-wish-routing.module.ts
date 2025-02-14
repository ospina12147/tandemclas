import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWishPage } from './list-wish.page';

const routes: Routes = [
  {
    path: '',
    component: ListWishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWishPageRoutingModule {}
