import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
})
export class OrderHistoryPage {

  userData:any = "";
  orderHistory:any = [];
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
      this.api.get(`wp-json/tutor/v1/students/${userData.id}/order-histories`).then((respData:any) => {
       
        if(respData.data && respData.data.length > 0){
          this.orderHistory = respData.data;
        }
        this.tools.loaderHide()
      })  
      .catch(err => {
  
      })
    }catch{
      
    }
  }
}
