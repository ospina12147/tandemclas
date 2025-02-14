import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalDetailCoursePage } from './modal-detail-course.page';

const routes: Routes = [
  {
    path: '',
    component: ModalDetailCoursePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalDetailCoursePageRoutingModule {}
