import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AlertController,IonModal,LoadingController,ModalController,NavController, ToastController,
} from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ToolsService } from './../../../services/tools/tools.service';
import { ApiService } from './../../../services/api/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalBuyCoursePage } from 'src/app/modalBuyCourse/modal-buy-course/modal-buy-course.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-modal-detail-course',
  templateUrl: './modal-detail-course.page.html',
  styleUrls: ['./modal-detail-course.page.scss'],
})
export class ModalDetailCoursePage{

  @Input() data_course: any;
  source_youtube_modify:any = ""
  buttonCourse:any = false;
  listCount:any = [];
  listReviews:any = [];
  listReviewsLimit:any = [];
  isModalReviewOpen:any = false;

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController,
    private iab: InAppBrowser) { }

  ionViewWillEnter() {
    this.modifyUrl()
    this.getData()
  }

  modifyUrl(){
    if(this.data_course.additional_info.video[0].source_youtube){
      this.source_youtube_modify = this.data_course.additional_info.video[0].source_youtube.replace('watch?v=', 'embed/')
    }
  }

  closeModalReview(isOpen){
    if(this.listReviewsLimit.length > 0){
      this.isModalReviewOpen = isOpen;
    }
  }

  async getData(){
    console.log(this.data_course)
    this.tools.loaderShow("Vlidando informacion de curso");
    const userData = await this.tools.get("stg-user");
    try {
      this.api.get(`wp-json/tutor/v1/students/${userData.id}/courses`).then((resp:any) => {
        if(resp.data.enrolled_courses){
          for (let element of resp.data.enrolled_courses) {
            if(element.ID == this.data_course.ID){
              this.buttonCourse = true;
            }
          }
        }
      })
      .catch(err => {
      })
      

      this.api.get(`wp-json/tutor/v1/topics?course_id=${this.data_course.ID}`).then(async(resp2:any) => {
        this.listCount = resp2.data;
      })
      .catch(err => {
      })

      this.api.get(`wp-json/tutor/v1/reviews?course_id=${this.data_course.ID}`).then((resp3:any) => {
        if(resp3.data){
          this.listReviews = resp3.data;
          
          for (let index = 0; index < this.listReviews.length; index++) {
            const dateToday:any = new Date();
            const dateReviews:any = new Date(this.listReviews[index].comment_date);
           // Asegurarse de que la fecha dada sea válida

            // Obtener la diferencia en milisegundos
            const diferenciaMilisegundos = dateToday - dateReviews;

            // Convertir milisegundos a días
            const diferenciaDias = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
            const weeks = Math.floor(diferenciaDias / 7);

            this.listReviews[index].weekComment = weeks;

            if(index < 3){
              this.listReviewsLimit.push(this.listReviews[index])
            }
          }

        console.log(this.listReviews)
        }
        
        this.tools.loaderHide();
      })
      .catch((err) => {
        this.tools.loaderHide();
      })
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  async getCourse(){
    const userData = await this.tools.get("stg-user");
    console.log(this.data_course);
      const alert = await this.alertCtrl.create({
        cssClass:'alert-confirm-logout',
        header: 'Seguro quieres obtener este curso?',
        buttons: [
          {
            text: 'Aceptar',
            handler: async(data) => {
              if(this.data_course.additional_info.course_price_type[0] == "free"){
                try {
                  this.api.post(`wp-json/tutor/v1/enrollments`,{
                    user_id: userData.id,
                    course_id: this.data_course.ID
                  }).then((resp:any) => {
                   if(resp.data.enrollment_id){
                    this.tools.notification(resp.message,"warning");
                    this.buttonCourse = true;
                   }
                  })
                  .catch(err => {
                    this.tools.loaderHide();
                  })
                } catch (error) {
                  this.tools.loaderHide();
                }
              }else{
                console.log(this.data_course);
                const jwt = await this.tools.get("tokenUser");
                
                const browser = this.iab.create(`https://flamma.site/?rest_route=/customlms/v1/autologin&JWT=${jwt}&redirectUrl=https://flamma.site/finalizar-compra/?add-to-cart=${this.data_course.product_id}`);
                browser.show();
                
                
                //window.open(`https://flamma.site/?rest_route=/customlms/v1/autologin&JWT=${jwt}&redirectUrl=https://flamma.site/finalizar-compra/?add-to-cart=${this.data_course.product_id}`);
                /*
                const modal2 = await this.modalCtrl.create({
                  component: ModalBuyCoursePage,
                  cssClass: 'detail-gift',
                  componentProps: {
                    'dataUrlPage':`https://flamma.site/?rest_route=/customlms/v1/autologin&JWT=${jwt}&redirectUrl=https://flamma.site/finalizar-compra/?add-to-cart=${this.data_course.product_id}`
                  }
                });
                modal2.onDidDismiss().then((response) => {
                  this.modalCtrl.dismiss();
                })
                return await modal2.present();
                */
                
              }
            }
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (data) => {
              return;
            }
          }
        ]
      });
      alert.present();
  }

  goToCourse(){
    this.modalCtrl.dismiss();
    console.log(this.data_course);
    const extraData = {
      course:this.data_course.ID,
      author:this.data_course.post_author.ID
    };

    this.router.navigateByUrl('tabs/detail-topic', {
        state: extraData
      });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
