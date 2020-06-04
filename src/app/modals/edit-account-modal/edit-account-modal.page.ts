import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, ToastController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-edit-account-modal',
  templateUrl: './edit-account-modal.page.html',
  styleUrls: ['./edit-account-modal.page.scss'],
})
export class EditAccountModalPage implements OnInit {

  registerForm: FormGroup;
  ID: string;
  loading = false;
  userFamily: string;

  constructor(public modalController: ModalController,
              public toastController: ToastController,
              private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.userFamily = localStorage.getItem('userFamily');
    this.ID = localStorage.getItem('userId');
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
      email: ['', Validators.required],
      name: ['', Validators.required],
      family: [''],
      date: [''],
      active: [''],
      loggedin: [''],
      role: ['familia']
    });
  }

  ionViewWillEnter() {
    this.GetAccountInfo();
  }

  UpdateAccount() {
    const data = {
      username: this.registerForm.value.username,
      name: this.registerForm.value.name,
      email: this.registerForm.value.email
    };
    this.authService.PUT(this.ID, data ).subscribe( async res => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: res.msg
        });
        await TOAST.present();
        this.closeModalWithData();
      } else {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: res.msg
        });
        await TOAST.present();
      }
    });
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true
    });
  }

  closeModalWithData() {
    this.modalController.dismiss({
      dismissed: true,
      data: true
    });
  }

  GetAccountInfo() {
    this.authService.GetById(this.ID, this.ID, this.userFamily).subscribe( async res => {
      if ( !res.success ) {
        this.loading = true;
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'No se pudo obtener la información'
        });
        await TOAST.present();
      } else {
        this.registerForm.patchValue({
          name: res.data.name,
          email: res.data.email,
          username: res.data.username
        });
        this.loading = false;
      }
    });
  }

}
