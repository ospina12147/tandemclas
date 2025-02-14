import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToolsService } from 'src/app/services/tools/tools.service';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {

  constructor(
    private tools: ToolsService,
    private navCtrl: NavController
  ) {

  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const isUserLoggedIn = await this.tools.get('stg-login');
    console.log(isUserLoggedIn)
    try {
      if (isUserLoggedIn) {
        this.navCtrl.navigateRoot('tabs/tab1');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return true;
    }

  }

}