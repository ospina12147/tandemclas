import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {AlertController,IonModal,LoadingController,ModalController,NavController, ToastController, MenuController, 
} from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { ToolsService } from './../../services/tools/tools.service';
import { ApiService } from './../../services/api/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute  } from '@angular/router';
import { SendAssigmentModalPage } from './../../modals/sendAssigmentModal/send-assigment-modal/send-assigment-modal.page'
import { SendQuizModalPage } from './../../modals/sendQuizModal/send-quiz-modal/send-quiz-modal.page'
import { ModalDetailsQuizPage } from 'src/app/modals/modal-details-quiz/modal-details-quiz/modal-details-quiz.page';
import { ListAssigmentPage } from 'src/app/listAssignment/list-assigment/list-assigment.page';
import { unserialize } from 'php-serialize';
import { Buffer } from 'buffer';

@Component({
  selector: 'app-detail-topic',
  templateUrl: './detail-topic.page.html',
  styleUrls: ['./detail-topic.page.scss'],
})
export class DetailTopicPage {

  segmentContent:any = "lecciones"
  dataCourseId:any;
  topics:any = [];
  dataAuthorId:any;
  ionContent:any = "lesson";
  dataQuiz:any = {
    title:"Cargando...",
    cant_quest:"cargando",
    total_trys:"Cargando...",
    notas_aprob:"Cargando"
  }

  questionsData:any;
  quizData:any
  dataLesson:any ={
    attachments:[]
  };

  userData:any;
  questions:any;
  questionSend:any = "";
  tittleAssigment:any = "";
  infoAssigment:any;
  idAssigment:any = 0;
  descriptionLesson:any = "lesson"
  flagGetData:any = false;
  list_trys_quizes:any = [];

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
  ) { 
    
  }

  ionViewWillEnter() {
    this.tools.loaderShow("Obteniendo temas, porfavor espera")
    this.dataEmpty();
    this.getData();
  }

  dataEmpty(){
    this.topics = [];
    this.dataLesson ={
      attachments:[]
    };
  }

  async getData(){
    this.segmentContent = "lecciones"
    this.userData = await this.tools.get('stg-user')
    try {
      const dataNav = history.state;

        this.dataCourseId = dataNav.course; 
        this.dataAuthorId = dataNav.author;
        
        this.api.get(`wp-json/tutor/v1/topics?course_id=${this.dataCourseId}`).then(async(resp:any) => {
          if(resp.data){
            this.topics = [];
            console.log("wp-json/tutor/v1/topics?course_i")
            console.log(resp.data)
            for (let index = resp.data.length - 1; index >= 0 ; index--) {
              await this.api.get(`wp-json/tutor/v1/lessons?topic_id=${resp.data[index].ID}`).then((resp2:any) => {
                resp.data[index].lessons = resp2.data;
                
              })
              .catch(err => {
              })
              
              console.log(resp.data[index].ID)
              await this.api.get(`wp-json/customlms/v1/assignments?topic_id=${resp.data[index].ID}`).then((resp2:any) => {
                console.log("assignments")
                console.log(resp2)
                resp.data[index].assignments = resp2.data;
              })
              .catch(err => {
              })
              
               
              this.api.get(`wp-json/tutor/v1/quizzes?topic_id=${resp.data[index].ID}`).then((resp2:any) => {
                resp.data[index].quizzes = resp2.data;

              })
              .catch(err => {

              })

              this.topics.push(resp.data[index])
            }
            
            if(this.topics[(this.topics.length-1)*1].lessons[0]){
              this.showLesson(this.topics[(this.topics.length-1)*1].lessons[0]);
            }else{
              this.ionContent = "inicio"
            }
            console.log("Antes de settimeout")
            setTimeout(() => {
              this.tools.loaderHide();
            }, 2000);
          }
          
        })
        .catch(err => {
        })

        await this.api.get(`wp-json/tutor/v1/qna?course_id=${this.dataCourseId}`).then((respQ:any) => {
          if(respQ.data){
            this.questions = respQ.data;
          }
        })
        .catch(err => {
          this.tools.loaderHide();
        })

      
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  openMenuTopic(){
    this.menuCtrl.open('menu-topic');
  }
  
  showQuiz(quiz:any){
    this.tools.loaderShow("Cargando quiz")
    console.log(quiz)
    this.list_trys_quizes = []
    this.api.get(`wp-json/tutor/v1/quiz-attempts?quiz_id=${quiz.ID}&student_id=${this.userData.id}`).then((resp:any) =>{
      console.log(resp)
      if(resp.data.length > 0){
        (window as any).Buffer = Buffer;
        const deserializedData = unserialize(resp.data[0].attempt_info);
        console.log(deserializedData)
        this.dataQuiz.metaData = deserializedData
      }
      this.api.get(`wp-json/customlms/v1/quiz-question-answer/${quiz.ID}`).then((resp2:any) =>{
        this.quizData = quiz;
      this.questionsData = resp2;
      this.ionContent = "quiz"
      this.dataQuiz.title = quiz.post_title;
      this.dataQuiz.post_content = quiz.post_content;
      this.dataQuiz.cant_quest = resp2.data.length;
      let tryQuiz = 0;
      if(resp.data != false){
        tryQuiz = resp.data.length;
      }
      this.dataQuiz.total_trys = tryQuiz+"/"+quiz.quiz_settings[0].max_questions_for_answer;
      this.dataQuiz.notas_aprob = quiz.quiz_settings[0].passing_grade;
      this.dataQuiz.id = quiz.ID;
      this.tools.loaderHide()
      this.menuCtrl.close('menu-topic');
      })
      .catch(err => {
        this.tools.loaderHide()
      })

      this.api.get(`wp-json/tutor/v1/quiz-attempts?student_id=${this.userData.id}&quiz_id=${quiz.ID}`).then((resp:any) => {
        if(resp.data){
          this.list_trys_quizes = resp.data;
        }
      })
    })
    .catch(err => {
      this.tools.loaderHide()
    })


    
  }

  showLesson(lesson:any){
    this.dataLesson.time_lesson = "";
    this.dataLesson.url_video = "";
    this.ionContent = "lesson"
    this.dataLesson.post_content = lesson.post_content;
    this.dataLesson.post_title = lesson.post_title;
    if(lesson.video.length > 0){
      this.dataLesson.time_lesson = `${lesson.video[0].runtime.hours} horas ${lesson.video[0].runtime.minutes} minutos ${lesson.video[0].runtime.seconds} segundos`;
      this.dataLesson.url_video = lesson.video[0].source_youtube.replace('watch?v=', 'embed/')
    }
    this.dataLesson.attachments = lesson.attachments;
    this.menuCtrl.close('menu-topic');
  }

  async showAssignment(assingment:any){
    //const deserializedData = unserialize(assingment);
    this.tittleAssigment = assingment.post_title
    this.idAssigment = assingment.ID;
    this.menuCtrl.close('menu-topic');
    this.api.get(`wp-json/tutor/v1/assignments?student_id=${this.userData.id}&assignment_id=${assingment.ID}`).then((resp:any) =>{
      (window as any).Buffer = Buffer;
      const deserializedData = unserialize(resp.data.meta_data.assignment_option[0]);
      console.log(deserializedData)
      this.infoAssigment = assingment;
      this.infoAssigment.options = resp.data
      this.infoAssigment.meta_data = deserializedData
      this.ionContent = "assignment"

      console.log(this.infoAssigment?.meta_data?.time_duration)
    })
    .catch(err => {
      console.log(err)
    })
  }

  onSegmentChange(event: any){
    this.segmentContent = event.detail.value
    this.ionContent = "lesson"
  }

  selectInfoLesson(event: any){
    this.descriptionLesson = event.detail.value
  }

  async sendQuestion(){
    if(this.questionSend != ""){
      await this.api.post("wp-json/tutor/v1/qna",{
        course_id:this.dataCourseId,
        user_id:this.userData.id,
        qna_text:this.questionSend
      }).then(async(resp:any) => {
        await this.api.get(`wp-json/tutor/v1/qna?course_id=${this.dataCourseId}`).then((respQ:any) => {
          this.questions = [];
          if(respQ.data){
            this.questions = respQ.data;
          }
        })
        .catch(err => {
        })
      })
      .catch((err)  => {
      })
    }
  }

  async showASsigmentResp(assingment){
    const modal = await this.modalCtrl.create({
      component: SendAssigmentModalPage,
      cssClass: 'detail-gift',
      componentProps: {
        'data_assigment': this.idAssigment,
        'student_id': this.userData.id
      }
    });
    modal.onDidDismiss().then((response) => {

    })
    return await modal.present();
  }

  async showQuizResp(dataQuiz:any){
    console.log(this.questionsData)
    const modal = await this.modalCtrl.create({
      component: SendQuizModalPage,
      cssClass: 'detail-gift',
      canDismiss: (data?: any, role?: string) => {
        return new Promise<boolean>(resolve => resolve(role === "close"))
      },
      componentProps: {
        'questionsData': this.questionsData.data,
        'quizData': this.quizData,
        'course_id': this.dataCourseId,
        'quiz_id': dataQuiz.id,
        'student_id': this.userData.id
      }
    });
    modal.onDidDismiss().then((response) => {

    })
    return await modal.present();
  }

  async datailQuiz(quiz:any){
    console.log(quiz);
    const modal = await this.modalCtrl.create({
      component: ModalDetailsQuizPage,
      cssClass: 'detail-gift',
      componentProps: {
        'attempt_id':quiz.attempt_id
      }
    });
    modal.onDidDismiss().then((response) => {
       
    })
    return await modal.present();
    
  }

  async showListAssigment(assigment:any){
    assigment.assigment_id = this.idAssigment
    console.log(assigment);
    
    const modal = await this.modalCtrl.create({
      component: ListAssigmentPage,
      cssClass: 'detail-gift',
      componentProps: {
        'assignment':assigment
      }
    });
    modal.onDidDismiss().then((response) => {
    })
    return await modal.present();
  }
  
  async validateCompleteCourse(){
    
    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Quieres dar por completado este curso?',
      buttons: [
        {
          text: 'Si',
          handler: async (data) => {
            await this.api.get(`wp-json/customlms/v1/validate-course?user_id=${this.userData.id}&course_id=${this.dataCourseId}`).then((respData:any) => {
              if(respData.data.can_complete){
                this.api.post(`wp-json/tutor/v1/course-mark-complete`,{
                  course_id:this.dataCourseId,
                  student_id:this.userData.id
                }).then((resp:any) =>{
                  this.tools.notification("Curso completado, para descargar el certificado dirigete a la sección de tus cursos","warning")
                })
                .catch((err) => {
                  this.tools.notification("Ocurrio un error, vuelve a intentarlo","danger")
                })
              }else{
                let message = "No se puede completar el curso:" 
                respData.data.messages.forEach(element => {
                  message =  message + " " + element
                });
                this.tools.notification(message,"danger")
              }
            })
            .catch(err => {
            })

          }
        },
        {
          text: 'No',
          role: 'cancel',
          handler: (data) => {
          }
        }
      ]
    });
    alert.present();
  }

}
