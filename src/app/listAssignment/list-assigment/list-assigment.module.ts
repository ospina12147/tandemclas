import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListAssigmentPageRoutingModule } from './list-assigment-routing.module';

import { ListAssigmentPage } from './list-assigment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListAssigmentPageRoutingModule
  ],
  declarations: [ListAssigmentPage]
})
export class ListAssigmentPageModule {}
