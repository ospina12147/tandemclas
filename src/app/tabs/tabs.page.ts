import { Component } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, MenuController } from '@ionic/angular';
import { ToolsService } from '../services/tools/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  titleHeader:any = "Inicio"

  constructor(
    private tools: ToolsService,
    private router: Router,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController
  ) {}

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

  openMenuAll(){
    console.log("hola")
    this.menuCtrl.open('menu-all-tabs');
  }

  changeTitle(titleHeader:any){
    console.log(titleHeader)
    this.titleHeader = titleHeader;
  }
  
}
