import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { ToolsService } from '../services/tools/tools.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, ModalController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage{

  dataProfile:any={
    first_name:"Sin nombre",
    last_name:"Sin apellido",
    user_name:"Sin nombre de usuario",
    user_email:"Sin correo electrónico",
    phone_number:"Sin número teléfonico",
    job_title:"Sin titulo de trabajo",
    bio:"Sin biografia"
  }

  blockOptions:any = false

  constructor(
    private api: ApiService,
    private tools: ToolsService,
    private router: Router,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.getData();
  }

  async getData(){
    //this.tools.loaderShow('Obteniendo información, por favor espera');
    this.blockOptions = true;
    try {
      const userData = await this.tools.get('stg-user')
      if(userData){
        this.api.get(`wp-json/tutor/v1/profile/${userData.id}`).then((resp:any) => {
          console.log(resp)
          this.dataProfile.first_name = resp.data.first_name != "" ? resp.data.first_name : this.dataProfile.first_name;
          this.dataProfile.last_name = resp.data.last_name != "" ? resp.data.last_name : this.dataProfile.last_name;
          this.dataProfile.user_name = resp.data.user_name != "" ? resp.data.user_name : this.dataProfile.user_name;
          this.dataProfile.user_email = resp.data.user_email != "" ? resp.data.user_email : this.dataProfile.user_email;
          this.dataProfile.phone_number = resp.data.phone_number != "" ? resp.data.phone_number : this.dataProfile.phone_number;
          this.dataProfile.job_title = resp.data.job_title != "" ? resp.data.job_title : this.dataProfile.job_title;
          this.dataProfile.bio = resp.data.bio != "" ? resp.data.bio : this.dataProfile.bio;
          
          this.blockOptions = false;
          //this.tools.loaderHide();
        })
      }
    } catch (error) {
      this.blockOptions = false;
      //this.tools.loaderHide();
    }
  }

  async logout(){
    
    await this.tools.set('stg-login',false)
    this.router.navigate(['login']);
  }

  async confirmLogout(){
    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Seguro quieres cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (data) => {

          }
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            this.logout();
          }
        }
      ]
    });
    alert.present();
  }

  goToComponent(url:any){
    this.router.navigate([url]);
  }
}
