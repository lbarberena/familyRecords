import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-edit-family-users-modal',
  templateUrl: './edit-family-users-modal.page.html',
  styleUrls: ['./edit-family-users-modal.page.scss'],
})
export class EditFamilyUsersModalPage implements OnInit {

  familyName: string;
  ID: string;
  loading = false;
  familyMembers = [];
  active: false;
  loggedIn = [];

  constructor(private authService: AuthService,
              public modalController: ModalController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.familyName = localStorage.getItem('userFamily');
    this.ID = localStorage.getItem('userId');
    this.loading = true;
  }

  ionViewWillEnter() {
    this.GetFamilyMembers();
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  GetFamilyMembers() {
    this.authService.GetUsersInFamily(this.ID, this.familyName, this.familyName).subscribe( async res => {
      if ( !res.success ) {
        this.loading = true;
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'No se pudo obtener la información'
        });
        await TOAST.present();
      } else {
        this.familyMembers = (await res.data);
        this.active = (await  res.data.active);
        this.loggedIn = (await res.data.loggedin);
        this.loading = false;
      }
    });
  }


}
