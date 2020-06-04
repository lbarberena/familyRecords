import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ModalController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.page.html',
  styleUrls: ['./change-password-modal.page.scss'],
})
export class ChangePasswordModalPage implements OnInit {
  registerForm: FormGroup;
  passwordForm: FormGroup;
  user;
  confirmPassword;
  exist = false;

  constructor( private authService: AuthService,
               private router: Router,
               private formBuilder: FormBuilder,
               public toastController: ToastController,
               public modalController: ModalController) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', Validators.required]
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
      passwordChanged: true
    });
  }

  async confirmUser() {
    const data = {
      username: this.user
    };
    this.authService.ConfirmUser( data ).subscribe(async res => {
      if ( res.success ) {
        this.exist = true;
      } else if ( !res.success ) {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: res.msg
        });
        await TOAST.present();
      }
    });
  }

  async changePassword() {
    this.passwordForm.patchValue({
      username: this.user
    });
    const form = this.passwordForm.value;
    if ( !this.confirmPassword ) {
      const TOAST = await this.toastController.create({
        duration: 15,
        message: 'Debes confirmar la contraseña'
      });
      await TOAST.present();
    } else if ( this.confirmPassword === this.passwordForm.value.password ) {
      this.authService.RequestChangePassword( form ).subscribe( async res => {
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
    } else {
      const TOAST = await this.toastController.create({
        duration: 15,
        message: 'Las contraseñas no coinciden'
      });
      await TOAST.present();
    }

  }

}
