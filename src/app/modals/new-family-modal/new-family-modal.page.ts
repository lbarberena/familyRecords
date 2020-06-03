import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {FamilyService} from '../../services/family.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-family-modal',
  templateUrl: './new-family-modal.page.html',
  styleUrls: ['./new-family-modal.page.scss'],
})
export class NewFamilyModalPage implements OnInit {

  newFamily: FormGroup;
  actualDate = new Date();

  constructor(public modalController: ModalController,
              private familyService: FamilyService,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.newFamily = this.formBuilder.group({
      familyName: ['', Validators.required],
      date: [this.actualDate]
    });
  }

  dismiss( Data: any ) {
    this.modalController.dismiss({
      dismissed: true,
      data: Data
    });
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  Save() {
    const form = this.newFamily.value;
    this.familyService.POST(form).subscribe( async res => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 25,
          message: res.msg
        });
        await TOAST.present();
        this.dismiss(res.data);
      } else {

      }
    });
  }

  async AskForConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Debes crear una familia',
      subHeader: '¿Seguro quieres salir?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.closeModal();
          }
        }
      ]
    });
    await alert.present();
  }

}
