import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailTopicPage } from './detail-topic.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTopicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailTopicPageRoutingModule {}
