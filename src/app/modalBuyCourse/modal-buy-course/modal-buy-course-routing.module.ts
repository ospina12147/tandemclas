import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBuyCoursePage } from './modal-buy-course.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBuyCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBuyCoursePageRoutingModule {}
