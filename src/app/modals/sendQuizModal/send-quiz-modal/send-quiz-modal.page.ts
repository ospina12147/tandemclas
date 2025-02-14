import { Component, OnInit, Input, ViewChild} from '@angular/core';
import {AlertController,IonModal,LoadingController,ModalController,NavController, ToastController,
} from '@ionic/angular';
import { IonContent, ItemReorderEventDetail} from '@ionic/angular';
import { ToolsService } from './../../../services/tools/tools.service';
import { ApiService } from './../../../services/api/api.service';
import { ActionSheetController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-quiz-modal',
  templateUrl: './send-quiz-modal.page.html',
  styleUrls: ['./send-quiz-modal.page.scss'],
})
export class SendQuizModalPage {

  @Input() course_id: any;
  @Input() quiz_id: any;
  @Input() student_id: any;
  @Input() questionsData: any;
  @Input() quizData: any;
  
  text_quiz:any = "";
  question:any
  numberQuestion = 0;
  quiz_question_answers:any = [];
  form: FormGroup;
  NewOrderingForm:any = [];
  endQuiz:any = false;


  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder
  ) { 
    this.form = this.formBuilder.group({
      multipleChoice: this.formBuilder.array([
      ])
    });
  }

  ionViewWillEnter() {
    this.getFirstQuestion();
  }

  async closeModal() {

    await this.modalCtrl.dismiss(undefined, "close")
  }

  async getFirstQuestion(){
    console.log(this.questionsData)
    this.question = this.questionsData[this.numberQuestion];
    console.log(this.question)
    if(this.question.question_type == "multiple_choice"){
      let arrayFormOption = []
      for (let index = 0; index < this.question.question_answers.length; index++) {
        arrayFormOption.push(this.formBuilder.control(false))
      }
      this.form = this.formBuilder.group({
        multipleChoice: this.formBuilder.array(arrayFormOption)
      });
    }

    if(this.question.question_type == "fill_in_the_blank"){
      let arrayFormOption = []
      const arrayData = this.question.question_answers[0].answer_two_gap_match.split("|")
      this.question.question_answers.fillBlankAnswer = arrayData;
      console.log(this.question)
      for (let index = 0; index < arrayData.length; index++) {
        arrayFormOption.push(this.formBuilder.control(false))
      }
      this.form = this.formBuilder.group({
        fill_in_the_blank: this.formBuilder.array(arrayFormOption)
      });
    }

  }

  async sendAssigment(){

    const dataObject = {
      course_id: this.course_id,
      student_id: this.student_id,
      quiz_id: this.quiz_id,
      quiz_question_answers: this.quiz_question_answers
    }
    console.log(dataObject)
    
    this.api.post(`wp-json/tutor/v1/quiz-attempts`,dataObject).then((resp3:any) => {
      console.log(resp3)
      this.tools.loaderHide();
      this.tools.notification("Quiz enviado de forma correcta","warning")
      this.modalCtrl.dismiss(undefined, "close")
    })
    .catch((err) => {
      this.tools.loaderHide();
    })

    /*
    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Has finalizado el quiz, quieres enviar tus respuestas?',
      buttons: [
        {
          text: 'Si',
          handler: (data) => {
            const dataObject = {
              course_id: this.course_id,
              student_id: this.student_id,
              quiz_id: this.quiz_id,
              quiz_question_answers: this.quiz_question_answers
            }
            console.log(dataObject)
            
            this.api.post(`wp-json/tutor/v1/quiz-attempts`,dataObject).then((resp3:any) => {
              console.log(resp3)
              this.tools.loaderHide();
              this.tools.notification("Quiz enviado de forma correcta","warning")
              this.modalCtrl.dismiss(undefined, "close")
            })
            .catch((err) => {
              this.tools.loaderHide();
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
    */
    
  }

  async submitForm(form, question_type, question_id){

    console.log(form.form.get('responseAnswer')?.getRawValue())
    if((form.form.get('responseAnswer')?.getRawValue() || question_type == "ordering") && question_type != "multiple_choice" && question_type != "fill_in_the_blank"){
      let answerData = form.form.get('responseAnswer')?.getRawValue()
      if(question_type == "ordering"){
        answerData = []
        this.NewOrderingForm.forEach(element => {
          answerData.push(element.answer_id)
        });
        this.NewOrderingForm = [];
      }
      const alert = await this.alertCtrl.create({
        cssClass:'alert-confirm-logout',
        header: 'Estas seguro con tu respuesta?',
        buttons: [
          {
            text: 'Si',
            handler: (data) => {

              if(question_type == 'single_choice'){
                this.quiz_question_answers.push(
                  {
                    "question_id": question_id,
                    "question_type": question_type,
                    "answer": [answerData]
                  }
                )
              }else{
                this.quiz_question_answers.push(
                  {
                    "question_id": question_id,
                    "question_type": question_type,
                    "answer": answerData
                  }
                )
              }
              
              
              this.numberQuestion = this.numberQuestion + 1;
              if(!this.questionsData[this.numberQuestion]){
                this.sendAssigment()
                return;
              }
              this.question = this.questionsData[this.numberQuestion];
              console.log(this.quiz_question_answers)
              if(this.question.question_type == "multiple_choice"){
                let arrayFormOption = []
                for (let index = 0; index < this.question.question_answers.length; index++) {
                  arrayFormOption.push(this.formBuilder.control(false))
                }
                this.form = this.formBuilder.group({
                  multipleChoice: this.formBuilder.array(arrayFormOption)
                });
              }

              if(this.question.question_type == "fill_in_the_blank"){
                let arrayFormOption = []
                const arrayData = this.question.question_answers[0].answer_two_gap_match.split("|")
                this.question.question_answers.fillBlankAnswer = arrayData;
                console.log(this.question)
                for (let index = 0; index < arrayData.length; index++) {
                  arrayFormOption.push(this.formBuilder.control(false))
                }
                this.form = this.formBuilder.group({
                  fill_in_the_blank: this.formBuilder.array(arrayFormOption)
                });
              }
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
    else{
      this.tools.notification("Debes responser la pregunta para poder avanzar","warning");
    }
  }

  previousQuestion(){
    if(this.questionsData[this.numberQuestion - 1]){
      this.numberQuestion = this.numberQuestion - 1;
      this.question = this.questionsData[this.numberQuestion];  
      this.quiz_question_answers.pop()
    }
  }

  async submitFormMultipleChoice(event, question_type, question_id){
    //evento al dar respuesta a preguntas de opcion multiple
    let arrayOptionSelect = [];

    this.form.value.multipleChoice.forEach((element, index) => {
      if(element == true){
        arrayOptionSelect.push(this.question.question_answers[index].answer_id)
      }
    });
      
      if(arrayOptionSelect.length > 0){

        const alert = await this.alertCtrl.create({
          cssClass:'alert-confirm-logout',
          header: 'Estas seguro con tu respuesta?',
          buttons: [
            {
              text: 'Si',
              handler: (data) => {

                this.quiz_question_answers.push(
                  {
                    "question_id": question_id,
                    "question_type": question_type,
                    "answer": arrayOptionSelect
                  }
                )
                console.log(this.quiz_question_answers)
                this.numberQuestion = this.numberQuestion + 1;
                if(!this.questionsData[this.numberQuestion]){
                  this.sendAssigment()
                  return;
                }
                this.question = this.questionsData[this.numberQuestion];
                if(this.question.question_type == "multiple_choice"){
                  let arrayFormOption = []
                  for (let index = 0; index < this.question.question_answers.length; index++) {
                    arrayFormOption.push(this.formBuilder.control(false))
                  }
                  this.form = this.formBuilder.group({
                    multipleChoice: this.formBuilder.array(arrayFormOption)
                  });
                }
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
      else{
        this.tools.notification("Debes responser la pregunta para poder avanzar","warning");
      }
  }

  async submitFormFillBlank(form, question_type, question_id){

    let arrayOptionSelect = [];
    const arrayData = this.question.question_answers[0].answer_two_gap_match.split("|")

      for (let index = 0; index < arrayData.length; index++) {
        if(form.form.get(`responseAnswer${index}`)?.getRawValue() != ""){
          arrayOptionSelect.push(form.form.get(`responseAnswer${index}`)?.getRawValue())
        }else{
          this.tools.notification("Debes responser la pregunta para poder avanzar","warning");
        }

      }

      let answerData = form.form.get('responseAnswer')?.getRawValue()
      if(question_type == "ordering"){
        answerData = []
        this.NewOrderingForm.forEach(element => {
          answerData.push(element.answer_id)
        });
        this.NewOrderingForm = [];
      }
      const alert = await this.alertCtrl.create({
        cssClass:'alert-confirm-logout',
        header: 'Estas seguro con tu respuesta?',
        buttons: [
          {
            text: 'Si',
            handler: (data) => {

              this.quiz_question_answers.push(
                {
                  "question_id": question_id,
                  "question_type": question_type,
                  "answer": arrayOptionSelect
                }
              )
              
              
              this.numberQuestion = this.numberQuestion + 1;
              if(!this.questionsData[this.numberQuestion]){
                this.sendAssigment()
                return;
              }
              this.question = this.questionsData[this.numberQuestion];
              console.log(this.quiz_question_answers)
              if(this.question.question_type == "multiple_choice"){
                let arrayFormOption = []
                for (let index = 0; index < this.question.question_answers.length; index++) {
                  arrayFormOption.push(this.formBuilder.control(false))
                }
                this.form = this.formBuilder.group({
                  multipleChoice: this.formBuilder.array(arrayFormOption)
                });
              }

              if(this.question.question_type == "fill_in_the_blank"){
                let arrayFormOption = []
                const arrayData = this.question.question_answers[0].answer_two_gap_match.split("|")
                this.question.question_answers.fillBlankAnswer = arrayData;
                console.log(this.question)
                for (let index = 0; index < arrayData.length; index++) {
                  arrayFormOption.push(this.formBuilder.control(false))
                }
                this.form = this.formBuilder.group({
                  fill_in_the_blank: this.formBuilder.array(arrayFormOption)
                });
              }
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

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    //evento que se activa al usar el formulario de ordenamientos de palabras
    
    const [movedItem] = this.question.question_answers.splice(ev.detail.from, 1);

    // Insertamos el elemento en la nueva posición
    this.question.question_answers.splice(ev.detail.to, 0, movedItem);
    
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to - 1);
    this.NewOrderingForm = this.question.question_answers;
    console.log(this.NewOrderingForm)
    ev.detail.complete();
  }

  get multipleChoice() {
    // evento que se activa al seleccionar varias opciones en los checkbox
    return (this.form.get('multipleChoice') as FormArray);
  }


}
