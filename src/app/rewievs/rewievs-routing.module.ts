import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewievsPage } from './rewievs.page';

const routes: Routes = [
  {
    path: '',
    component: RewievsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RewievsPageRoutingModule {}
