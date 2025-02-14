import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  dataProfile:any
  form: FormGroup;
  formPassword: FormGroup;
  flagButton =  false;
  loaderRequest = false;
  imageElement:any;
  imageProfile:any = "";
  segmentContent:any = 'Profile'

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private tools: ToolsService,
    private alertCtrl: AlertController
    ) {
      this.form = this.formBuilder.group({
        first_name:['', [Validators.required]],
        last_name:['', [Validators.required]],
        job_title:['', [Validators.required]],
        phone_number:['', [Validators.required]],
        profile_bio:['', [Validators.required]],
      }
      );

      this.formPassword = this.formBuilder.group({
        lastPassword:['',
        Validators.compose([Validators.required, Validators.minLength(7)])],
        password:['',
        Validators.compose([Validators.required, Validators.minLength(7)])],
        newPasswordConfirm:['', Validators.compose([Validators.required, Validators.minLength(7)])]
      }
      );
    }

    ionViewWillEnter() {
      this.getData();
  }

  async getData(){
    this.tools.loaderShow('Obteniendo información, por favor espera');
    try {
      const userData = await this.tools.get('stg-user')
      this.dataProfile = userData;
      if(userData){
        this.api.get(`wp-json/tutor/v1/profile/${userData.id}`).then((resp:any) => {
          console.log(resp.data);
          this.form = this.formBuilder.group({
            user_id:[userData.id],
            first_name:[resp.data.first_name, [Validators.required]],
            last_name:[resp.data.last_name, [Validators.required]],
            job_title:[resp.data.job_title, [Validators.required]],
            phone_number:[resp.data.phone_number, [Validators.required]],
            profile_bio:[resp.data.bio, [Validators.required]],
          }
          );
          this.tools.loaderHide();
        })
      }
    } catch (error) {
      this.tools.loaderHide();
    }
  }

  async updateProfile(event: Event){

    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Seguro quieres actualizar la información de tu perfil?',
      buttons: [
        {
          text: 'Aceptar',
          handler: async(data) => {
            event.preventDefault();
            this.flagButton = true;
            this.loaderRequest = true;
            try {
              if (this.form.valid) {
                /*
                const tokenFcm = await this.tools.get('stg-token-fcm');
                this.form.value.token_fcm = (tokenFcm != null) ? tokenFcm.token : 'NO DISPONIBLE';
                */
                this.api.put(`wp-json/tutor/v1/update-profile`, this.form.value).then((resp: any) => {
                  this.tools.notification(resp.message,"warning")
                  this.flagButton = false;
                  this.loaderRequest = false;
                }).catch(err =>{
                  this.flagButton = false;
                  this.loaderRequest = false;
                })
          
              }
            } catch (error) {
              this.flagButton = false;
              this.loaderRequest = false;
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (data) => {
            return;
          }
        }
      ]
    });
    alert.present();

    

  }

  async updatePassword(event: Event){

    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Seguro quieres actualizar tu contraseña?',
      buttons: [
        {
          text: 'Aceptar',
          handler: async(data) => {
            this.tools.loaderShow("Actualizando contraseña, por favor espera")
            event.preventDefault();
            if(this.formPassword.value.newPasswordConfirm != this.formPassword.value.password){
              this.tools.loaderHide();
              this.tools.notification("Debe confirmar correctamente la contraseña nueva.","warning")
              return;
            }
            this.flagButton = true;
            this.loaderRequest = true;
            const userData = await this.tools.get('stg-user')
            console.log(userData);
            try {
              if (this.form.valid) {
                await this.api.post('wp-json/jwt-auth/v1/token', {
                  username:'adminflamma',
                  password:'V$ZI95xywOEyHA9dvfCzolBk'
                }).then(async(resp: any) => {
                  if(resp.token){
                    await this.tools.set('tokenUser', resp.token)
                  }
                })
                .catch(err2 => {
                  console.log(err2)
                  this.tools.loaderHide();
                  this.tools.notification(err2.error.message,"warning");
                })
                /*
                const tokenFcm = await this.tools.get('stg-token-fcm');
                this.form.value.token_fcm = (tokenFcm != null) ? tokenFcm.token : 'NO DISPONIBLE';
                */
                this.formPassword.value.username = userData.slug;
                this.formPassword.value.id = userData.id,
                this.api.post('wp-json/jwt-auth/v1/token', {
                  username: this.formPassword.value.username,
                  password: this.formPassword.value.lastPassword
                }).then((resp: any) => {
                  if (resp.token) {
                    this.api.postBearer(`wp-json/wp/v2/users/${userData.id}`, this.formPassword.value).then((resp: any) => {
                      this.tools.loaderHide();
                      this.tools.notification("Contraseña actualizada correctamente","warning")
                      this.flagButton = false;
                      this.loaderRequest = false;
                    }).catch(err =>{
                      this.tools.loaderHide();
                      this.flagButton = false;
                      this.loaderRequest = false;
                    })
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
              this.flagButton = false;
              this.loaderRequest = false;
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (data) => {
            return;
          }
        }
      ]
    });
    alert.present();

    
  }

  onSegmentChange(event: any){
    this.segmentContent = event.detail.value
  }

  async updatePhoto(){

    const alert = await this.alertCtrl.create({
      cssClass:'alert-confirm-logout',
      header: 'Seguro quieres actualizar tu foto de perfil?',
      buttons: [
        {
          text: 'Aceptar',
          handler: async(data) => {
            
            try {
              const photo = await Camera.getPhoto({
                quality: 50,
                resultType: CameraResultType.Uri, // Usar URI para obtener la imagen
                source: CameraSource.Photos, // Desde la galería del dispositivo
              });
        
              this.imageProfile = photo.webPath || ''; // Almacenar la URI de la imagen

              console.log("Cargando imagen")
              console.log(this.imageProfile)
              const formData = new FormData();
              const response = await fetch(this.imageProfile);
              const blob = await response.blob(); // Convertir URI a un Blob
              console.log(blob)

              formData.append('file', blob, 'image.png');
              formData.append('user_id', this.dataProfile.id);

              await this.api.post('wp-json/tutor/v1/upload-photo/profile-photo', formData).then((resp:any)=>{
                console.log(resp)
              })
              .catch(err =>{
                console.log(err)
              })


            } catch (error) {
              console.error('Error al seleccionar la imagen:', error);
            }

            
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (data) => {
            return;
          }
        }
      ]
    });
    alert.present();

      
  }
}
