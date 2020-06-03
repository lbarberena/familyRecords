import { Component, OnInit } from '@angular/core';
import {MedicalRecordsService} from '../../../services/medical-records.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-admin-medical-records',
  templateUrl: './admin-medical-records.page.html',
  styleUrls: ['./admin-medical-records.page.scss'],
})
export class AdminMedicalRecordsPage implements OnInit {

  newRecord: FormGroup;
  userId: string;
  userFamily: string;
  date: string;
  hour: string;

  constructor(private medicalRecordsService: MedicalRecordsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userFamily = this.route.snapshot.paramMap.get('userFamily');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.newRecord = this.formBuilder.group({
      recordName: ['', Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      date: [''],
      username: ['']
    });
  }

  SaveRecord() {
    this.newRecord.patchValue({
      date: this.CreateTheDate(),
      username: localStorage.getItem('user')
    });
    const form = this.newRecord.value;
    console.log(form);
    /*this.medicalRecordsService.POST(form, this.userId, this.userFamily).subscribe( async (res) => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'Registro Guardado'
        });
        await TOAST.present();
        this.router.navigateByUrl(`/tabs/medical-records/medicalRecord/${this.userId}/${this.userFamily}`);
      } else {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'Ocurrió un error al Guardar'
        });
        await TOAST.present();
      }
    });*/
  }

  CreateTheDate(): string {
    const newDate: string = this.date + ' ' + this.hour;
    return newDate;
  }

}
