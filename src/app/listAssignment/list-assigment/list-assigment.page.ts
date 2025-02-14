import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-list-assigment',
  templateUrl: './list-assigment.page.html',
  styleUrls: ['./list-assigment.page.scss'],
})
export class ListAssigmentPage {

  @Input() assignment: any;
  userData:any;
  descriptionAssigment:any = "";
  loaderRequest:any = false;

  constructor(private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,) { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData(){
    this.tools.loaderShow('Estamos trabajando, por favor espera');
    this.descriptionAssigment = this.assignment.comment_content;
    const userData = await this.tools.get('stg-user')
    this.userData = userData;
    console.log(this.assignment)

    this.tools.loaderHide()
  }

  updateValoration(){
    console.log(this.assignment)
    console.log(this.descriptionAssigment);
    this.tools.loaderShow('Actualizando respuesta');
    this.api.post(`wp-json/tutor/v1/assignment-submit/${this.assignment.comment_ID}`,{
      assignment_id:this.assignment.assigment_id,
      assignment_answer:this.descriptionAssigment,
      student_id:this.assignment.user_id
    }).then((resp3:any) => {
      this.tools.notification(resp3.message,"warning")
      this.tools.loaderHide();
      this.modalCtrl.dismiss();
    }).catch(err => {
      this.tools.notification("Ocurrio un error inesperado","danger")
      this.tools.loaderHide();
      this.modalCtrl.dismiss();
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
