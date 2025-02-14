import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SafeUrlPipe } from './../../pipes/safeUrl/safe-url.pipe';
import { DetailTopicPageRoutingModule } from './detail-topic-routing.module';

import { DetailTopicPage } from './detail-topic.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTopicPageRoutingModule
  ],
  declarations: [DetailTopicPage, SafeUrlPipe],
  exports:[SafeUrlPipe]
})
export class DetailTopicPageModule {}
