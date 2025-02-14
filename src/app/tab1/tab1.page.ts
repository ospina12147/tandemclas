import { Component } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ModalController } from '@ionic/angular';
import { ModalDetailCoursePage } from '../modals/modal-detail-course/modal-detail-course/modal-detail-course.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  dashboardData:any = {
    active_course_count:0,
    completed_course_count:0,
    enrolled_course_count:0,
    wish_course_count:0,
  }

  userData:any
  loaderRequest:boolean = false
  dataUser:any={
    data:{
      first_name:"...",
      last_name:""
    }
  };
  list_courses_show:any = [];
  list_enrolled_courses:any = [];
  list_wish_course:any = [];

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
  ) {

  }

  ionViewWillEnter() {
    this.getData();
  }

  async getData(){

    this.tools.loaderShow('Estamos trabajando, por favor espera');
    const userData = await this.tools.get('stg-user')
    this.userData = userData;
    this.api.get(`wp-json/tutor/v1/profile/${userData.id}`).then((respUser:any) => {
      this.dataUser = respUser;
    })
    .catch(err => {

    })
    
    console.log(userData);
    this.dataUser = userData;
    if(userData){
      await this.api.get(`wp-json/tutor/v1/students/${userData.id}/dashboard`).then((resp:any) => {
        this.dashboardData.active_course_count = resp.data.active_course_count
        this.dashboardData.completed_course_count = resp.data.completed_course_count
        this.dashboardData.enrolled_course_count = resp.data.enrolled_course_count
      })
      .catch((err) =>{

      })
      
      await this.api.get(`wp-json/tutor/v1/wishlists?user_id=${userData.id}`).then((resp:any) => {
        console.log(resp.data)
        this.list_wish_course = resp.data
        this.dashboardData.wish_course_count = (resp.data).length
      })
      .catch((err) => {

      })

      this.api.get(`wp-json/customlms/v1/students/${userData.id}/courses`).then((resp:any) => {
        console.log(resp);
        this.list_enrolled_courses = resp.data.enrolled_courses
        
        this.list_enrolled_courses.forEach((element:any, index:any) => {
          const porcent = element.course_completed_percentage.substring(0, element.course_completed_percentage.length - 1);
          this.list_enrolled_courses[index].course_completed_percentage_decimal = ((porcent*1)/100);
        })
      })
      .catch((err) => {

      })
      
      
      this.api.get(`wp-json/tutor/v1/courses?order=desc&orderby=post_modified&paged=1`).then((resp:any) => {
        console.log(resp);

        this.list_courses_show = [];

        resp.data.posts.forEach((element:any) => {
          for(let element2 of this.list_wish_course){
            if(element.guid == element2.guid){
              element.favorite = true;
              break;
            }else{
              element.favorite = false;
            }
          };
          this.list_courses_show.push(element)
        });
      })
      .catch((err) => {
        
      })
    }
    setTimeout(() => {
      this.tools.loaderHide()
    }, 3000);

  }

  addWishList(course:any, index:any){
    if(!this.loaderRequest){
      this.loaderRequest = true;
      try {
        this.api.post(`wp-json/tutor/v1/wishlists`,{
          user_id: this.userData.id,
          course_id: course.ID
        }).then((resp:any) => {
          this.tools.notification(resp.message,"warning")
          this.list_courses_show[index].favorite = true;
          this.list_enrolled_courses[index].favorite = true;
          this.loaderRequest = false;

          this.api.get(`wp-json/tutor/v1/wishlists?user_id=${this.userData.id}`).then((resp:any) => {
            console.log(resp.data)
            this.list_wish_course = resp.data
            this.dashboardData.wish_course_count = (resp.data).length
          })
        })
        .catch(err => {
          this.loaderRequest = false;
        })
      } catch (error) {
        this.loaderRequest = false;
      }
    }
  }

  deleteWishList(course:any, index:any){
    console.log(this.loaderRequest)
    if(!this.loaderRequest){
      this.loaderRequest = true;
      try {
        this.api.delete(`wp-json/tutor/v1/wishlists?user_id=${this.userData.id}&course_id=${course.ID}`).then((resp:any) => {
          this.tools.notification(resp.message,"warning")
          this.list_courses_show[index].favorite = false;
          this.list_enrolled_courses[index].favorite = false;
          this.loaderRequest = false;
          this.api.get(`wp-json/tutor/v1/wishlists?user_id=${this.userData.id}`).then((resp:any) => {
            console.log(resp.data)
            this.list_wish_course = resp.data
            this.dashboardData.wish_course_count = (resp.data).length
          })
        })
        .catch(err => {
          this.loaderRequest = false;
        })
      } catch (error) {
        this.loaderRequest = false;
      }
    }
  }

  async viewCourse(course:any){
    console.log(course)
    
    const modal = await this.modalCtrl.create({
      component: ModalDetailCoursePage,
      cssClass: 'detail-gift',
      componentProps: {
        'data_course':course
      }
    });
    modal.onDidDismiss().then((response) => {

    })
    return await modal.present();
    
  }

  async viewCourseData(course:any){
    const extraData = {
      course:course.ID,
      author:course.post_author
    };

    this.router.navigateByUrl('tabs/detail-topic', {
        state: extraData
      });
    
  }

  goToComponent(url:any){
    this.router.navigate([url]);
  }
}
