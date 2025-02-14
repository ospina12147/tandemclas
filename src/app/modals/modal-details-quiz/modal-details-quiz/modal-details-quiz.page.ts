
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AlertController,IonModal,LoadingController,ModalController,NavController, ToastController,
} from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ToolsService } from './../../../services/tools/tools.service';
import { ApiService } from './../../../services/api/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-details-quiz',
  templateUrl: './modal-details-quiz.page.html',
  styleUrls: ['./modal-details-quiz.page.scss'],
})
export class ModalDetailsQuizPage {

  @Input() attempt_id: any;
  listAnswers:any = [];
  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData(){
    this.tools.loaderShow("Obteniendo información. por favor espera")
    console.log(this.attempt_id)
    try {

  
      await this.api.get(`wp-json/customlms/v1/quiz-attempt/${this.attempt_id}`).then((resp:any) => {
        this.listAnswers = resp.data.answers;
        this.tools.loaderHide()
      }).catch(err => {
        this.tools.loaderHide();
      })
    } catch (error) {
      this.tools.loaderHide();
    }
    

  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
