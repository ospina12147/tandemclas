import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalEditValorationPageRoutingModule } from './modal-edit-valoration-routing.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ModalEditValorationPage } from './modal-edit-valoration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    ModalEditValorationPageRoutingModule
  ],
  declarations: [ModalEditValorationPage]
})
export class ModalEditValorationPageModule {}
