
import { Injectable } from '@angular/core';

import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  version: string;

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {
    this.version = '10.0.07';
  }

  // Preferences
  async get(key: string) {
    const ret = await Preferences.get({ key: key });
    let retValue:any = {};
    if(ret.value){
      retValue = ret.value
    }
    return JSON.parse(retValue);
  }

  async set(key: string, data: any = {}) {
    return await Preferences.set({ key: key, value: JSON.stringify(data) });
  }

  async remove(key: string) {
    return await Preferences.remove({ key: key });
  }

  async clear() {
    
    return await Preferences.clear();
  }

  // System loading

  async loaderShow(message?: string) {
    const loading = await this.loadingController.create({
      message,
      cssClass:'custom-loading',
      spinner:'bubbles'
    });

    await loading.present();
  }

  async loaderHide() {
    setTimeout(async () => {
      await this.loadingController.dismiss();
    }, 500);
  }

  // Notification

  async notification(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color: color,
      duration: 5000,
    });

    await toast.present();
  }

  async alertOK(title: string, subTitle: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      cssClass: "classalert-wrapper",
      subHeader: subTitle,
      message: message,
      buttons: ["OK"]
    });

    await alert.present();
  }

  async alertActualizar(title: string, subTitle: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      cssClass: "classalert-wrapper",
      subHeader: subTitle,
      message: message,
      buttons: [
        {
          text: 'Salir',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Actualizar',
          handler: () => {
            window.open('https://play.google.com/store/apps/details?id=app.bnc.easycollect.cliente', '_system', 'location=yes')
          }
        }
      ]
    });

    await alert.present();
  }

  roundTo(n:any, digits:any) {
    var negative = false;
    if (digits === undefined) {
      digits = 0;
    }
    if (n < 0) {
      negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
      n = (n * -1).toFixed(digits);
    }
    return n;
  }

  validateFile(format:string) {
    var allowedExtension = ['jpeg', 'jpg', 'png', 'bmp'];
    var isValidFile = false;

    for (var index in allowedExtension) {
      if (format === allowedExtension[index]) {
        isValidFile = true;
        break;
      }
    }

    if (!isValidFile) {
      this.notification('Las extensiones permitidas son : *.' + allowedExtension.join(', *.'),'danger');
    }

    return isValidFile;
  }

  formatValor(e: any, separador: string = ".", decimais: number = 2) {
    let a: any = e.detail.value.split("");
    let ns: string = "";
    a.forEach((c: any) => {
      if (!isNaN(c)) ns = ns + c;
    });
    ns = parseInt(ns).toString();
    if (ns.length < decimais + 1) {
      ns = "0".repeat(decimais + 1) + ns;
      ns = ns.slice((decimais + 1) * -1);
    }
    let ans = ns.split("");
    let r = "";
    for (let i = 0; i < ans.length; i++)
      if (i == ans.length - decimais) r = r + separador + ans[i];
      else r = r + ans[i];
    e.target.value = r;
  }

  async validarDocumento(cli_doc:any) {
    console.log(cli_doc)
    cli_doc = cli_doc.toLowerCase();
    const mathLetters = cli_doc.search(/[a-z]/i);
    let len_doc = cli_doc.length;
    let doc_number = parseInt(cli_doc);
    let b_number = (mathLetters >= 0)? true: false;
    let b_bandera = false;
    return new Promise(async (resolve, reject) => {
      this.get("stg-user")
        .then((resp: any) => {

          if(resp.unidad.vetados.some((vetado:any) => vetado.cli_doc == cli_doc)){
            this.alertOK('CLIENTE VETADO','No fue posible crear el cliente porque se encuentra vetado','');
            resolve(false);
            return;
          }
          resp.user.validar_documento.forEach((validacion:any) => {
            validacion.tdp_tamanio = parseInt(validacion.tdp_tamanio);
            validacion.tdp_letras = parseInt(validacion.tdp_letras);
            if (
              validacion.tdp_tamanio == len_doc &&
              validacion.tdp_letras == true
            ) {
              if (b_number) {
                resolve(true);
              }
            }
            if (
              validacion.tdp_tamanio == len_doc &&
              validacion.tdp_letras == false
            ) {
              if (!b_number) {
                resolve(true);
              }
            }
          });
          resolve(false);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  async validarVetado(cli_doc:any){
    return new Promise(async (resolve, reject) => {
      this.get("stg-user")
        .then((resp: any) => {
          if(resp.unidad.vetados.some((vetado:any) => vetado.cli_doc == cli_doc)){
            this.alertOK('CLIENTE VETADO','No fue posible crear el cliente porque se encuentra vetado','');
            resolve(false);
          }else{
            resolve(true)
          }
        });
      });
  }



}
