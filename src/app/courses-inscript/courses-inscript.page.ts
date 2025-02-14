import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Http } from '@capacitor-community/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-inscript',
  templateUrl: './courses-inscript.page.html',
  styleUrls: ['./courses-inscript.page.scss'],
})
export class CoursesInscriptPage{

  active_courses:any;
  completed_courses:any;
  enrolled_courses:any;
  segmentContent:any = "matriculados"
  userData:any = "";

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    this.getData()
  }

  async getData(){
    try {
      this.tools.loaderShow('Estamos trabajando, por favor espera');
      const userData = await this.tools.get('stg-user')
      this.userData = userData;
      if(userData){
        await this.api.get(`wp-json/customlms/v1/students/${userData.id}/courses`).then(async (resp:any) => {
          console.log(resp);
          this.active_courses = resp.data.active_courses;
          this.completed_courses = resp.data.completed_courses;
          this.enrolled_courses = resp.data.enrolled_courses;

          await this.enrolled_courses.forEach((element:any, index:any) => {
            const porcent = element.course_completed_percentage.substring(0, element.course_completed_percentage.length - 1);
            this.enrolled_courses[index].course_completed_percentage_decimal = ((porcent*1)/100);

            this.active_courses.forEach((element2:any, index2:any) => {
              if(element2.ID == element.ID){
                this.active_courses[index2].course_completed_percentage = this.enrolled_courses[index].course_completed_percentage;
                this.active_courses[index2].course_completed_percentage_decimal = this.enrolled_courses[index].course_completed_percentage_decimal;
              }
            });

            this.completed_courses.forEach(async(element3:any, index3:any) => {
              if(element3.ID == element.ID){
                
                this.completed_courses[index3].course_completed_percentage = this.enrolled_courses[index].course_completed_percentage;
                this.completed_courses[index3].course_completed_percentage_decimal = this.enrolled_courses[index].course_completed_percentage_decimal;
              }
            });

          });

          await this.completed_courses.forEach(async(element3:any, index3:any) => {
            await this.api.get(`wp-json/customlms/v1/certificate?user_id=${this.userData.id}&course_id=${element3.ID}`).then((resp:any) => {
              if(resp.data.certificate_url){
                this.completed_courses[index3].urlCertificate = resp.data.certificate_url
              }
            })
            console.log(this.completed_courses)
          });

          
        })
      }
        this.tools.loaderHide()
      } catch (error) {
        this.tools.loaderHide()
      }
  }

  onSegmentChange(event: any){
    this.segmentContent = event.detail.value
  }

  viewCourse(course:any){
    console.log(course)
    const extraData = {
      course:course.ID,
      author:course.post_author
    };

    this.router.navigateByUrl('tabs/detail-topic', {
        state: extraData
      });
  }

  async viewCertification(course:any){
    console.log(course)
    this.tools.loaderShow("Consultando certificado")
    await this.api.get(`wp-json/customlms/v1/certificate?user_id=${this.userData.id}&course_id=${course.ID}`).then((resp:any) => {
      console.log(resp)
      if(resp.data.certificate_url){
      }
    })
  }

}
