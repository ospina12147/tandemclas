import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalEditValorationPage } from './../modals/modal-edit-valoration/modal-edit-valoration/modal-edit-valoration.page';

@Component({
  selector: 'app-rewievs',
  templateUrl: './rewievs.page.html',
  styleUrls: ['./rewievs.page.scss'],
})
export class RewievsPage{

  list_reviews:any=[];

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController
  ) { }

    ionViewWillEnter() {
      this.getData();
    }
  
    async getData(){
      this.tools.loaderShow('Obteniendo información, por favor espera');
      try {
        const userData = await this.tools.get('stg-user')
        if(userData){
          this.api.get(`wp-json/tutor/v1/reviews?user_id=${userData.id}`).then((resp:any) => {
            this.list_reviews = resp.data;
            this.list_reviews.forEach((element:any, index:any) => {
              let fecha1 = new Date(element.comment_date);
              let fecha2 = new Date();
              let diferencia = fecha2.getTime() - fecha1.getTime();
              let diasDeDiferencia = Math.round(diferencia / 1000 / 60 / 60 / 24);
              const rating_number = (this.list_reviews[index].rating)*1
              let rating_star = ''
              for (let index = 0; index < rating_number; index++) {
                rating_star = rating_star + '☆';
              }
              this.list_reviews[index].rating_star = rating_star;
              this.list_reviews[index].count_days = diasDeDiferencia;
            });
            console.log(this.list_reviews)
            this.tools.loaderHide();
          })
          .catch((err) => {
            this.tools.loaderHide();
          })
        }
      } catch (error) {
        this.tools.loaderHide();
      }
    }

    async editValoration(valoration:any){
      console.log(valoration)
      
      const modal = await this.modalCtrl.create({
        component: ModalEditValorationPage,
        cssClass: 'detail-gift',
        componentProps: {
          'comment_content':valoration.comment_content,
          'rating':valoration.rating,
          'comment_post_ID':valoration.comment_post_ID,
          'user_id':valoration.user_id,
          'comment_ID':valoration.comment_ID,
        }
      });
      modal.onDidDismiss().then((response) => {
         this.getData()
      })
      return await modal.present();
      
    }
}
