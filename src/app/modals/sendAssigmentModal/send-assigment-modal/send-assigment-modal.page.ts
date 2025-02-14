import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AlertController,IonModal,LoadingController,ModalController,NavController, ToastController,
} from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ToolsService } from './../../../services/tools/tools.service';
import { ApiService } from './../../../services/api/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-send-assigment-modal',
  templateUrl: './send-assigment-modal.page.html',
  styleUrls: ['./send-assigment-modal.page.scss'],
})
export class SendAssigmentModalPage {

  @Input() data_assigment: any;
  @Input() student_id: any;
  text_assigment:any = "";
  selectedFile: File | null = null;

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    console.log(this.data_assigment)
    console.log(this.student_id)
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  sendAssigment(){

    const formData = new FormData();
    formData.append('assignment_id', this.data_assigment);
    formData.append('student_id', this.student_id);
    formData.append('assignment_answer', this.text_assigment);
    
    if(this.selectedFile != null){
      formData.append('attached_assignment_files[]', this.selectedFile); // Enviar archivo
    }

    this.api.post(`wp-json/tutor/v1/assignment-submit`,formData).then((resp3:any) => {
      this.tools.notification(resp3.message,"warning")
      this.tools.loaderHide();
      this.modalCtrl.dismiss();
    })
    .catch((err) => {
      console.log(err)
      if(err.error.data.details.assignment){
        this.tools.notification(err.error.data.details.assignment,"danger")
      }
      this.tools.loaderHide();
      this.modalCtrl.dismiss();
    })
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('No se seleccionó ningún archivo');
      return;
    }
    console.log(this.selectedFile)
    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // URL de la API donde se enviará el archivo
    console.log(formData)
    this.api.post(`wp-json/tutor/v1/assignment-attachment/${this.data_assigment}?file_name=entrega`,{
      
    }).then((resp3:any) => {
      
    })

  }
}
