import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesInscriptPage } from './courses-inscript.page';

const routes: Routes = [
  {
    path: '',
    component: CoursesInscriptPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesInscriptPageRoutingModule {}
