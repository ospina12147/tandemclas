import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { ActionSheetController, AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ModalDetailsQuizPage } from './../modals/modal-details-quiz/modal-details-quiz/modal-details-quiz.page';
import {serialize, unserialize} from 'php-serialize'

@Component({
  selector: 'app-try-quest',
  templateUrl: './try-quest.page.html',
  styleUrls: ['./try-quest.page.scss'],
})
export class TryQuestPage {

  list_trys_quizes:any = [];
  list_courses:any = []

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
        await this.api.get(`wp-json/tutor/v1/students/${userData.id}/courses`).then((resp:any) => {
          this.list_courses = resp.data.enrolled_courses
        })
        await this.api.get(`wp-json/tutor/v1/quiz-attempts?student_id=${userData.id}`).then((resp:any) => {
          if(resp.data){
            resp.data.forEach(async(element1:any, index1:any) => {
              this.list_courses.forEach((element2:any, index2:any) => {
                if(element1.course_id == element2.ID){
                  resp.data[index1].post_title = element2.post_title;
                }
              });
            });
            this.list_trys_quizes = resp.data;
            this.tools.loaderHide();
          }
        })
        .catch((err) => {
          this.tools.loaderHide();
        })
      }
    } catch (error) {
      this.tools.loaderHide();
    }
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

  unserialize(serializedString) {
    const result = {};
    const regex = /([a-z]:\d+:"[^"]*";|i:\d+;|b:[01];|d:[^;]+;|a:\d+:{|})/g;
    const matches = serializedString.match(regex);
  
    const parseValue = (value) => {
      if (value.startsWith('s:')) {
        return value.match(/"([^"]*)"/)[1];
      } else if (value.startsWith('i:')) {
        return parseInt(value.slice(2, -1), 10);
      } else if (value.startsWith('b:')) {
        return value.slice(2, -1) === '1';
      } else if (value.startsWith('d:')) {
        return parseFloat(value.slice(2, -1));
      } else if (value.startsWith('a:')) {
        return {};
      }
      return value;
    };
  
    const stack = [result];
    const keyStack = [];
    let currentKey = null;
  
    matches.forEach((match) => {
      if (match.startsWith('a:')) {
        const obj = {};
        const parent = stack[stack.length - 1];
        if (currentKey !== null) {
          parent[currentKey] = obj;
        } else {
          stack[stack.length - 1] = obj;
        }
        stack.push(obj);
        keyStack.push(currentKey);
        currentKey = null;
      } else if (match === '}') {
        stack.pop();
        currentKey = keyStack.pop();
      } else {
        const value = parseValue(match);
        const parent = stack[stack.length - 1];
        if (currentKey === null) {
          currentKey = value;
        } else {
          parent[currentKey] = value;
          currentKey = null;
        }
      }
    });
  
    return result;
  }  
}
