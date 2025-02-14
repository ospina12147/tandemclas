import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalDetailsQuizPage } from './../modals/modal-details-quiz/modal-details-quiz/modal-details-quiz.page';

@Component({
  selector: 'app-quest-and-respond',
  templateUrl: './quest-and-respond.page.html',
  styleUrls: ['./quest-and-respond.page.scss'],
})
export class QuestAndRespondPage {
  list_q_a:any = []

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData(){
    this.tools.loaderShow('Obteniendo información, por favor espera');
    try {
      const userData = await this.tools.get('stg-user')
      if(userData){
        await this.api.get(`wp-json/tutor/v1/qna?user_id=${userData.id}`).then((resp:any) => {
          this.list_q_a = resp.data;
          console.log(this.list_q_a)
          this.tools.loaderHide();
        })
        .catch(err => {
          this.tools.loaderHide();
        })
        
      }
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  async markNoRead(q_a:any){
    this.tools.loaderShow('Actualizando información, por favor espera');
    try {
        await this.api.post(`wp-json/tutor/v1/qna-mark-read-unread/${q_a.comment_ID}`,{}).then((resp:any) => {
          this.tools.loaderHide();
        })
        .catch(err => {
          this.tools.loaderHide();
        })
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  async deleteQ(q_a:any){

    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Seguro quieres eliminar la pregunta?',
      buttons: [
        {
          text: 'Aceptar',
          handler: async(data:any) => {
            this.tools.loaderShow('Eliminando mensaje, por favor espera');
            try {
              const userData = await this.tools.get('stg-user')
              if(userData){
                await this.api.delete(`wp-json/tutor/v1/qna/${q_a.comment_ID}?user_id=${userData.id}`).then((resp:any) => {
                  this.tools.loaderHide();
                  setTimeout(() => {
                    this.getData();
                  }, 500);
                })
                .catch(err => {
                  this.tools.loaderHide();
                })
              }
            } catch (error) {
              this.tools.loaderHide();
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (data:any) => {

          }
        }
      ]
    });
    alert.present();

    
  }

  async datailQuiz(quiz:any){
    console.log(quiz);
    const modal = await this.modalCtrl.create({
      component: ModalDetailsQuizPage,
      cssClass: 'detail-gift',
      componentProps: {
        'quiz_id':quiz.quiz_id
      }
    });
    modal.onDidDismiss().then((response) => {
       this.getData()
    })
    return await modal.present();
    
  }
}
