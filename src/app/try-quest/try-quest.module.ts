import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TryQuestPageRoutingModule } from './try-quest-routing.module';

import { TryQuestPage } from './try-quest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TryQuestPageRoutingModule
  ],
  declarations: [TryQuestPage]
})
export class TryQuestPageModule {}
