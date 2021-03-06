import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  registerForm: FormGroup;
  passwordForm: FormGroup;
  user;
  confirmPassword;
  exist = false;

  constructor( private authService: AuthService,
               private router: Router,
               private formBuilder: FormBuilder,
               public toastController: ToastController) { }

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

  async login( Username: string, Password: string ) {
    const data = {
      username: Username,
      password: Password
    };
    await this.authService.Login( data ).subscribe(async res => {
          if ( res.success ) {
            localStorage.setItem('auth-token', res.data.token);
            localStorage.setItem('userFamily', res.data.userFamily);
            localStorage.setItem('user', res.data.username);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('name', res.data.name);
            const TOAST = await this.toastController.create({
              duration: 15,
              message: res.msg
            });
            await TOAST.present();
            await this.router.navigateByUrl(`/tabs/medical-records/medicalRecord/${res.data.userId}/${res.data.userFamily}`);
          } else if (res.success === false) {
            this.ereaseToken(res.msg);
            const TOAST = await this.toastController.create({
              duration: 15,
              message: res.msg
            });
            await TOAST.present();
          }

        }, error => {
          this.ereaseToken(error.msj);
        }
    );
  }

  async ereaseToken(msj: string) {
    const TOAST = await this.toastController.create({
      duration: 3,
      message: msj
    });
    await TOAST.present();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
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
          this.login(this.user, this.passwordForm.value.password);
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
