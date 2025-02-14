import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesInscriptPageRoutingModule } from './courses-inscript-routing.module';

import { CoursesInscriptPage } from './courses-inscript.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesInscriptPageRoutingModule
  ],
  declarations: [CoursesInscriptPage]
})
export class CoursesInscriptPageModule {}
