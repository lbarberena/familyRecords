import { Component } from '@angular/core';

import {AlertController, MenuController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  userId: string;
  userFamily: string;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: ( data ) => {
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('userFamily');
            localStorage.removeItem('name');
            this.closeMenu();
            this.router.navigateByUrl('/auth/login');
          }
        }
      ]
    });
    alert.present();
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  GetUserInfo() {
    // this.userFamily = this.route.snapshot.paramMap.get('userFamily');
    // this.userId = this.route.snapshot.paramMap.get('userId');
    this.userId = localStorage.getItem('userId');
    this.userFamily = localStorage.getItem('userFamily');
  }

  Home() {
    this.GetUserInfo();
    this.closeMenu();
    this.router.navigateByUrl(`/tabs/medical-records/medicalRecord/${this.userId}/${this.userFamily}`);
  }
}
