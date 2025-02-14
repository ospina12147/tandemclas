import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.page.html',
  styleUrls: ['./list-notification.page.scss'],
})
export class ListNotificationPage {

  userData:any = "";
  notificationHistory:any = [];
  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private modalCtrl: ModalController,
    private router: Router,
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData(){

    try {
      this.tools.loaderShow('Estamos trabajando, por favor espera');
      const userData = await this.tools.get('stg-user')
      this.userData = userData;
      this.api.get(`wp-json/customlms/v1/notifications?receiver_id=${userData.id}`).then((respData:any) => {
        
        if(respData.data){
          this.notificationHistory = respData.data;
        }
        console.log(respData)
        this.tools.loaderHide()
      })  
      .catch(err => {
  
      })
    }catch{
      
    }
  }
}
