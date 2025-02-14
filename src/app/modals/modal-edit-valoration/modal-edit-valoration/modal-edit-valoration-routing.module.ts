import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalEditValorationPage } from './modal-edit-valoration.page';

const routes: Routes = [
  {
    path: '',
    component: ModalEditValorationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalEditValorationPageRoutingModule {}
