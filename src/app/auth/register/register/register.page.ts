import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ToolsService } from 'src/app/services/tools/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  device: any;
  tokenRegister = '';
  iconPass = 'eye';
  form: FormGroup;
  flagButton =  false;
  loaderRequest = false;
  ciudades:any = [];
  ocupaciones:any=[];

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private tools: ToolsService,
    private router: Router
    ) {
      this.form = this.formBuilder.group({
        first_name:['', [Validators.required]],
        last_name:['', [Validators.required]],
        username:['', [Validators.required]],
        email:['', Validators.compose([Validators.required, Validators.email]),],
        password:['',
        Validators.compose([Validators.required, Validators.minLength(7)])],
        confirmPassword:['', Validators.compose([Validators.required, Validators.minLength(7)])],
        roles:['subscriber'],
        aceptTerm: false
      }
      );
    }

  ngOnInit() {


  }

  async register(event: Event) {
    event.preventDefault();
    this.tools.loaderShow('Validando informacion, por favor espera');

    if(this.form.value.aceptTerm != true){
      this.tools.notification('Debe aceptar los términos y condiciones',"warning");
      this.tools.loaderHide();
      return;
    }

    try {
      await this.api.post('wp-json/jwt-auth/v1/token', {
        username:'adminflamma',
        password:'V$ZI95xywOEyHA9dvfCzolBk'
      }).then(async(resp: any) => {
        if(resp.token){
          this.tokenRegister = resp.token;
          console.log(resp.token)
          await this.tools.set('tokenUser', resp.token)
          this.api.postBearer('wp-json/wp/v2/users',this.form.value).then((respUser: any) => {
            if(respUser.email){
              this.tools.notification('Usuario creado correctamente',"warning");
              this.tools.loaderHide();
              this.navCtrl.navigateRoot('login');
            }
          }).catch(err1 =>{
            this.tools.loaderHide();
            console.log(err1)
            this.tools.notification(err1.error.message,"warning");
          })
        }
      })
      .catch(err2 => {
        console.log(err2)
        this.tools.loaderHide();
        this.tools.notification(err2.error.message,"warning");
      })
    } catch (error) {
      this.tools.loaderHide();
    }
    
  }

  async goToLogin(){
    console.log("login")
    this.navCtrl.navigateRoot('login');
  }

}
