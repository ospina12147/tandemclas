import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListNotificationPageRoutingModule } from './list-notification-routing.module';

import { ListNotificationPage } from './list-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListNotificationPageRoutingModule
  ],
  declarations: [ListNotificationPage]
})
export class ListNotificationPageModule {}
