
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AlertController,IonModal,LoadingController,ModalController,NavController, ToastController,
} from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ToolsService } from './../../../services/tools/tools.service';
import { ApiService } from './../../../services/api/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-edit-valoration',
  templateUrl: './modal-edit-valoration.page.html',
  styleUrls: ['./modal-edit-valoration.page.scss'],
})
export class ModalEditValorationPage {

  @Input() comment_content: any;
  @Input() rating: any;
  @Input() comment_post_ID: any;
  @Input() user_id: any;
  @Input() comment_ID: any;

  description:any ="";
  form: FormGroup;
  loaderRequest = false;

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      rating: [this.rating, Validators.required],
      review :[this.comment_content, Validators.required],
    })
   }

   ionViewWillEnter() {
    this.form = this.fb.group({
      rating: [this.rating, Validators.required],
      review :[this.comment_content, Validators.required],
      course_id :[this.comment_post_ID, Validators.required],
      user_id:[this.user_id, Validators.required],
      
    })
    this.description = this.comment_content;
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  updateValoration(event: Event){
    try {
      this.tools.loaderShow("Obteniendo información. por favor espera")
      console.log(this.form.value)
      this.api.post(`wp-json/tutor/v1/reviews/${this.comment_ID}`, this.form.value).then((resp: any) => {
        if(resp.message){
          this.tools.notification('Revisión actualizada correctamente','warning')
          this.tools.loaderHide();
          this.modalCtrl.dismiss();
        }
      })
      .catch(err => {
        this.tools.loaderHide();
      })
    } catch (error) {
      this.tools.loaderHide();
    }
  }
}
