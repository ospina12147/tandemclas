import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ModalDetailCoursePage } from '../modals/modal-detail-course/modal-detail-course/modal-detail-course.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-wish',
  templateUrl: './list-wish.page.html',
  styleUrls: ['./list-wish.page.scss'],
})
export class ListWishPage{

  wishList:any = [];
  userData:any;

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
  ) { }

  ionViewWillEnter() {
    this.getData();
  }
  
  async getData(){
    this.tools.loaderShow('Obteniendo información, por favor espera');
    try {
      const userData = await this.tools.get('stg-user')
      this.userData = userData;
      if(userData){
        this.api.get(`wp-json/customlms/v1/wishlists?user_id=${userData.id}`).then((resp:any) => {

          this.wishList = resp.data;
          this.tools.loaderHide();
        })
      }
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  deleteWishList(course:any){
    console.log(course)
    this.tools.loaderShow("Eliminando curso de la lista de deseados");
    try {
      this.api.delete(`wp-json/tutor/v1/wishlists?user_id=${this.userData.id}&course_id=${course.ID}`).then((resp:any) => {
        console.log(resp)
        this.tools.loaderHide();
        this.getData();
      })
      .catch(err => {
        this.tools.loaderHide();
      })
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  viewCourse(course:any){
    this.tools.loaderShow("Consultando informacion")
    this.api.get(`wp-json/tutor/v1/courses?ID=${course.ID}`).then(async(resp:any) => {
      this.tools.loaderHide()
      
      const modal = await this.modalCtrl.create({
        component: ModalDetailCoursePage,
        cssClass: 'detail-gift',
        componentProps: {
          'data_course':resp.data.posts[0]
        }
      });
      modal.onDidDismiss().then((response) => {
         this.getData()
      })
      return await modal.present();

    })
    .catch(err => {
      this.tools.loaderHide()
    })
  }

}
