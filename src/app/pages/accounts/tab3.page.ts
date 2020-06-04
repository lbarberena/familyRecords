import {Component, OnInit} from '@angular/core';
import {ActionSheetController, AlertController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NewFamilyModalPage} from '../../modals/new-family-modal/new-family-modal.page';
import {EditAccountModalPage} from '../../modals/edit-account-modal/edit-account-modal.page';
import {ViewFamilyModalPage} from '../../modals/view-family-modal/view-family-modal.page';
import {EditFamilyUsersModalPage} from '../../modals/edit-family-users-modal/edit-family-users-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  loading = false;
  userEmail: string;
  username: string;
  name: string;
  creationDate: string;
  userId: string;
  userFamily: string;
  constructor(public actionSheetController: ActionSheetController,
              private router: Router,
              private alertCtrl: AlertController,
              private authService: AuthService,
              public toastController: ToastController,
              public modalController: ModalController) {}

  ngOnInit(): void {
    this.loading = true;
    this.userId = localStorage.getItem('userId');
    this.userFamily = localStorage.getItem('userFamily');
  }

  ionViewWillEnter() {
    this.GetAccountInfo();
  }

  GetAccountInfo() {
    this.authService.GetById(this.userId, this.userId, this.userFamily).subscribe( async res => {
      if ( res.success ) {
        this.userEmail = (await res.data.email);
        this.creationDate = (await res.data.date);
        this.username = (await res.data.username);
        this.name = (await res.data.name);
        this.loading = false;
        this.SetNewUserData();
      } else {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'No se pudo obtener la información'
        });
        await TOAST.present();
      }
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
            this.SetCloseSession();
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('userFamily');
            localStorage.removeItem('name');
            this.router.navigateByUrl('/auth/login');
          }
        }
      ]
    });
    await alert.present();
  }

  async PresentChangedInfo() {
    const alert = await this.alertCtrl.create({
      header: 'Has cambiado la información de tu cuenta',
      subHeader: 'Debes Iniciar Sesión nuevamente',
      buttons: [
        {
          text: 'Aceptar',
          handler: ( data ) => {
            this.SetCloseSession();
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user');
            localStorage.removeItem('userId');
            localStorage.removeItem('userFamily');
            localStorage.removeItem('name');
            this.router.navigateByUrl('/auth/login');
          }
        }
      ]
    });
    await alert.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ver Familia',
      buttons: [{
        text: 'Ver Información',
        icon: 'people-outline',
        handler: () => {
          this.presentModalViewFamilyData();
        }
      }, {
        text: 'Editar miembros',
        icon: 'pencil-outline',
        handler: () => {
          this.presentModalEditFamilyMembers();
        }
      },
        {
          text: 'Registrar nuevo miembro',
          icon: 'person-add-outline',
          handler: () => {
            this.presentModalRegisterNewMenber();
          }
        }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async presentModalEditAccount() {
    const modal = await this.modalController.create({
      component: EditAccountModalPage,
      cssClass: 'edit-account-modal-css'
    });

    modal.onDidDismiss().then( (data) => {
      if (data.data.data) {
        this.loading = true;
        this.GetAccountInfo();
        this.PresentChangedInfo();
      }
    });
    return await modal.present();
  }

  async presentModalRegisterNewMenber() {
    const modal = await this.modalController.create({
      component: EditAccountModalPage,
    });
    return await modal.present();
  }

  async presentModalEditFamilyMembers() {
    const modal = await this.modalController.create({
      component: EditFamilyUsersModalPage
    });

    return await modal.present();
  }

  async presentModalViewFamilyData() {
    const modal = await this.modalController.create({
      component: ViewFamilyModalPage
    });

    return await modal.present();
  }

  SetNewUserData() {
    localStorage.setItem('user', this.username);
    localStorage.setItem('name', this.name);
    localStorage.setItem('userFamily', this.userFamily);
  }

  SetCloseSession() {
    this.authService.PUT(this.userId, {loggedin: false}).subscribe(() => {});
  }

}
