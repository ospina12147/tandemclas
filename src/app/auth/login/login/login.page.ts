import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSheetController, MenuController, ModalController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToolsService } from 'src/app/services/tools/tools.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {


  device: any;
  typePass = 'password';
  iconPass = 'eye';
  form: FormGroup;
  flagButton =  false;
  loaderRequest = false;
  rememberPass:any = false;
  isModalOpen:any = false;
  titleModalFirsTime:any = "Aprendizaje en linea";
  textModalFirsTime:any = "¡Ofrecemos clases en liena y lecciones pregrabadas!";
  dictionaryModalFirstTime:any = [
    {
      titleModalFirsTime: "Aprendizaje en linea",
      textModalFirsTime: "¡Ofrecemos clases en liena y lecciones pregrabadas!"
    },
    {
      titleModalFirsTime: "Aprende en cualquier momento",
      textModalFirsTime: "Reserva o programa las clases para el futuro"
    },
    {
      titleModalFirsTime: "Obtén un certificado en linea",
      textModalFirsTime: "Analiza tus puntuaciones y sigue tus resultados"
    }
  ];
  pagModalFirstTime:any = 0;
  
  
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private tools: ToolsService,
    private alertController: AlertController
    ) {
      this.form = this.formBuilder.group({
        username:['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        rememberPass: false,
      });
      this.rememberUser();
    }

  ionViewWillEnter() {
    this.rememberUser();
  }

  async login(event: Event) {
    event.preventDefault();
    this.tools.set('userRemember',this.form.value);
    try {
      this.tools.loaderShow('Validando informacion, por favor espera');
      if (this.form.valid) {
        this.flagButton = true;
        this.loaderRequest = true;
        /*
        const tokenFcm = await this.tools.get('stg-token-fcm');
        this.form.value.token_fcm = (tokenFcm != null) ? tokenFcm.token : 'NO DISPONIBLE';
        */
        this.api.post('wp-json/jwt-auth/v1/token', this.form.value).then((resp: any) => {
          if (resp.token) {
            this.tools.set('tokenUser',resp.token)
            this.api.getBearer('wp-json/wp/v2/users/me').then((respUser: any) => {
              this.flagButton = false;
              this.loaderRequest = false;
              this.tools.set('stg-user',respUser)
              this.tools.set('stg-login',true)
              this.tools.loaderHide();
              this.navCtrl.navigateRoot('tabs/tab1');
            }).catch(async err => {
              this.flagButton = false;
              this.loaderRequest = false;
              if(err.error.message){
                this.tools.notification(err.error.message, 'danger');
              }
              this.tools.loaderHide();
            });
          }else{
            this.flagButton = false;
            this.loaderRequest = false;
            this.tools.loaderHide();
            this.tools.notification(resp.message, 'danger');
          }
        }).catch(async err => {
          this.flagButton = false;
          this.loaderRequest = false;
          if(err.error.message){
            this.tools.notification(err.error.message, 'danger');
          }
          this.tools.loaderHide();
        });
      }
    } catch (error) {
      console.log(error)
    }
   
  }

  async rememberUser(){

    await this.tools.get('modalNotShow').then((resp:any) => {
      if(resp != true){
        this.openModalFirstTime(true);
      }
    })
    .catch(err =>{
      this.openModalFirstTime(true);
    });

    const rememberUser = await this.tools.get('userRemember');
    console.log(rememberUser);
    if(rememberUser != null){
      if(rememberUser.rememberPass === true){
        this.form.controls['username'].setValue(rememberUser.username);
        this.form.controls['password'].setValue(rememberUser.password);
        this.form.controls['rememberPass'].setValue(rememberUser.rememberPass);
      }
    }
  }

  async openModalFirstTime(isOpen){
    this.isModalOpen = isOpen;
    
    if(isOpen == false){
      await this.tools.set('modalNotShow', true)
    }
  }

  goToRegisterD(){
    this.navCtrl.navigateRoot('register');
  }

  nextPageModalFirstTime(){
    this.pagModalFirstTime = this.pagModalFirstTime + 1;
    this.titleModalFirsTime = this.dictionaryModalFirstTime[this.pagModalFirstTime].titleModalFirsTime;
    this. textModalFirsTime = this.dictionaryModalFirstTime[this.pagModalFirstTime].textModalFirsTime;
  }

  pageModalFirstTime(page){
    this.pagModalFirstTime = page;
    this.titleModalFirsTime = this.dictionaryModalFirstTime[page].titleModalFirsTime;
    this. textModalFirsTime = this.dictionaryModalFirstTime[page].textModalFirsTime;
  }

  async showRememberPassword(){
    const alert = await this.alertController.create({
      message: "Digita tu nombre de usuario y te enviaremos al correo un enlace para recuperar tu cuenta",
      inputs:[
        {
          name: 'email',
          placeholder: 'Nombre de usuario',
          id: 'email'
        },
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: (data) => {
            this.api.post('wp-json/customlms/v1/reset-password', {user_login:data.email}).then((resp: any) => {
              if(resp.message){
                this.tools.notification(resp.message,'warning')
              }
            })
            .catch( err => {
              this.tools.notification(err.error.message, 'danger');
            })
            
          }
        }
      ]
    });
    alert.present();
  }

}
