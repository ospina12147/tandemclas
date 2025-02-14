import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBuyCoursePageRoutingModule } from './modal-buy-course-routing.module';

import { ModalBuyCoursePage } from './modal-buy-course.page';
import { DetailTopicPageModule } from 'src/app/detailTopic/detail-topic/detail-topic.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBuyCoursePageRoutingModule,
    DetailTopicPageModule
  ],
  declarations: [ModalBuyCoursePage]
})
export class ModalBuyCoursePageModule {}
