import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {MedicalRecordsService} from '../../services/medical-records.service';

@Component({
  selector: 'app-medical-record-info-modal',
  templateUrl: './medical-record-info-modal.page.html',
  styleUrls: ['./medical-record-info-modal.page.scss'],
})
export class MedicalRecordInfoModalPage implements OnInit {

  title: string;
  medicalRecordId: string;
  userId: string;
  userFamily: string;
  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private alertCtrl: AlertController,
              private route: ActivatedRoute,
              private medicalRecordsService: MedicalRecordsService) { }

  ngOnInit() {
    this.medicalRecordId = localStorage.getItem('medicalRecordId');
    this.title = localStorage.getItem('medicalRecordName');
    this.userFamily = this.route.snapshot.paramMap.get('userFamily');
    this.userId = this.route.snapshot.paramMap.get('userId');
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
    this.RemoveFromStorage();
  }

  DeleteMedicalRecord() {
    this.medicalRecordsService.DELETE(this.medicalRecordId, this.userId, this.userFamily).subscribe( async (res) => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'Registro Eliminado'
        });
        await TOAST.present();
        this.closeModal();
      } else {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'Ocurrió un error al Eliminar'
        });
        await TOAST.present();
      }
    });
  }

  async AskForConfirmation() {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro quieres borrar este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.DeleteMedicalRecord();
            this.RemoveFromStorage();
          }
        }
      ]
    });
    await alert.present();
  }

  RemoveFromStorage() {
    localStorage.removeItem('medicalRecordId');
    localStorage.removeItem('medicalRecordName');
  }

}
