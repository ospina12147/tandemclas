import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWishPageRoutingModule } from './list-wish-routing.module';

import { ListWishPage } from './list-wish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWishPageRoutingModule
  ],
  declarations: [ListWishPage]
})
export class ListWishPageModule {}
