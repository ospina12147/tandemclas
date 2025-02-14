import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ScrollDetail, MenuController} from '@ionic/angular';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalDetailCoursePage } from './../modals/modal-detail-course/modal-detail-course/modal-detail-course.page';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage{
  private scrollDepthTriggered = false;
  showFilterValue:any = false;
  listCompleteCourses:any = [];
  listShowCourses:any = [];
  pageFlag:any = 1;
  countCoursesFlag:any = 0;
  userData:any
  loaderRequest:any = false;
  durationFilter:any = "";
  nivelFilter:any = "";
  priceFilter:any = "";
  keyWordFilter:any ="";

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController
  ) { }

  ionViewWillEnter() {
    this.tools.loaderShow('Estamos trabajando, por favor espera');
    this.listCompleteCourses = [];
    this.listShowCourses = [];
    this.pageFlag = 1;
    this.countCoursesFlag = 0;
    this.getData()
  }

  async getData(filterKeyWord:any = false){
    
    try {
    const userData = await this.tools.get('stg-user')
    this.userData = userData;
    let listWish:any = [];

    if(filterKeyWord){
      this.listCompleteCourses = [];
      this.listShowCourses = [];
      this.pageFlag = 1;
      this.countCoursesFlag = 0;
    }

    if(userData){
      await this.api.get(`wp-json/tutor/v1/wishlists?user_id=${userData.id}`).then((resp:any) => {
        listWish = resp.data;
      })

      this.api.get(`wp-json/tutor/v1/courses?order=desc&orderby=ID&posts_per_page=40${this.durationFilter}${this.nivelFilter}${this.priceFilter}${this.keyWordFilter}`).then((resp:any) => {
        
        resp.data.posts.forEach((element:any) => {
          for(let element2 of listWish){
            if(element.guid == element2.guid){
              element.favorite = true;
              break;
            }else{
              element.favorite = false;
            }
          };
          this.listCompleteCourses.push(element)
        });

        this.listCompleteCourses.forEach((element:any, index:any) => {
          const rating_number = (this.listCompleteCourses[index].ratings.rating_avg)*1
          let rating_star = ''
          for (let index = 0; index < rating_number; index++) {
            rating_star = rating_star + '☆';
          }
          this.listCompleteCourses[index].rating_star = rating_star;
        });

        if(this.pageFlag == 1){
          this.listShowCourses = this.listCompleteCourses.slice(this.countCoursesFlag, 10)
          this.countCoursesFlag = this.countCoursesFlag + 10;
        }

        if(this.listCompleteCourses.length < resp.data.total_course){
          this.pageFlag = this.pageFlag + 1;
          this.getData();
        }
        console.log(this.listCompleteCourses)
        this.tools.loaderHide()
      })
      .catch(err => {
        this.tools.loaderHide()
      })

    }
    } catch (error) {
      this.tools.loaderHide()
    }
  }

  showFilter() {
    if (this.showFilterValue) {
      this.showFilterValue = false;
    } else {
      this.showFilterValue = true;
    }
  }

  async handleScroll($event: any) {
    // Section take event for scrolling page
    if(this.scrollDepthTriggered) {
      return;
    }

    if($event.target.localName != "ion-content") {
      return;
    }

    const scrollElement = await $event.target.getScrollElement();
    const scrollHeight = scrollElement.scrollHeight - scrollElement.clientHeight;
    const currentScrollDepth = scrollElement.scrollTop;
    const targetPercent = 97;
    let triggerDepth = ((scrollHeight / 100) * targetPercent);
    if(currentScrollDepth > triggerDepth) {
      this.scrollDepthTriggered = true;
      if(this.listCompleteCourses.length != this.listShowCourses.length){
        this.detectBottom();
      }
    }
  }
 

  openFilterCourse(){
    this.menuCtrl.open('options-filter');
  }


  addWishList(course:any, index:any){
    this.loaderRequest = true;
    try {
      this.api.post(`wp-json/tutor/v1/wishlists`,{
        user_id: this.userData.id,
        course_id: course.ID
      }).then((resp:any) => {
        this.tools.notification(resp.message,"warning")
        this.listShowCourses[index].favorite = true;
        this.loaderRequest = false;
      })
      .catch(err => {
        this.loaderRequest = false;
      })
    } catch (error) {
      this.loaderRequest = false;
    }

  }

  deleteWishList(course:any, index:any){
    this.loaderRequest = true;
    try {
      this.api.delete(`wp-json/tutor/v1/wishlists?user_id=${this.userData.id}&course_id=${course.ID}`).then((resp:any) => {
        this.tools.notification(resp.message,"warning")
        this.listShowCourses[index].favorite = false;
        this.loaderRequest = false;
      })
      .catch(err => {
        this.loaderRequest = false;
      })
    } catch (error) {
      this.loaderRequest = false;
    }
  }

  detectBottom(){
    this.tools.loaderShow('Estamos trabajando, por favor espera');
    let coursePush = this.listCompleteCourses.slice(this.countCoursesFlag, this.countCoursesFlag + 10)
    let courseTemp = this.listShowCourses;
    coursePush.forEach((element:any) => {
      courseTemp.push(element)
    });
    this.listShowCourses = courseTemp;
    this.countCoursesFlag = this.countCoursesFlag + 10;
    setTimeout(() => {
      this.scrollDepthTriggered = false;
      this.tools.loaderHide();
    }, 1000);
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
      this.tools.loaderShow('Estamos trabajando, por favor espera');
      this.listCompleteCourses = [];
      this.listShowCourses = [];
      this.pageFlag = 1;
      this.countCoursesFlag = 0;
       this.getData()
    })
    return await modal.present();
    
  }

  changePrice(evento:any){
    this.tools.loaderShow('Estamos trabajando, por favor espera');
    this.listCompleteCourses = [];
    this.listShowCourses = [];
    this.pageFlag = 1;
    this.countCoursesFlag = 0;
    this.priceFilter = evento.target.value;
    this.getData();
  }

  changeNivel(evento:any){
    this.tools.loaderShow('Estamos trabajando, por favor espera');
    this.listCompleteCourses = [];
    this.listShowCourses = [];
    this.pageFlag = 1;
    this.countCoursesFlag = 0;
    this.nivelFilter = evento.target.value;
    this.getData();
  }

  changeDuration(evento:any){
    this.tools.loaderShow('Estamos trabajando, por favor espera');
    this.listCompleteCourses = [];
    this.listShowCourses = [];
    this.pageFlag = 1;
    this.countCoursesFlag = 0;
    this.durationFilter = evento.target.value;
    this.getData();
  }

  filterKeyWord(evento:any){
    console.log("hola")
    this.listCompleteCourses = [];
    this.listShowCourses = [];
    this.pageFlag = 1;
    this.countCoursesFlag = "";
    if(evento.target.value == ""){
      this.keyWordFilter = "";
    }
    else{
      this.keyWordFilter = `&keyword=${evento.target.value}`
    }
    this.getData(true);
  }

}
