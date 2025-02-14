import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalDetailCoursePageRoutingModule } from './modal-detail-course-routing.module';
import { ModalDetailCoursePage } from './modal-detail-course.page';
import { DetailTopicPageModule } from 'src/app/detailTopic/detail-topic/detail-topic.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalDetailCoursePageRoutingModule,
    DetailTopicPageModule
  ],
  declarations: [ModalDetailCoursePage]
})
export class ModalDetailCoursePageModule {}
