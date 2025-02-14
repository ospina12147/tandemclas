import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendAssigmentModalPageRoutingModule } from './send-assigment-modal-routing.module';

import { SendAssigmentModalPage } from './send-assigment-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendAssigmentModalPageRoutingModule
  ],
  declarations: [SendAssigmentModalPage]
})
export class SendAssigmentModalPageModule {}
