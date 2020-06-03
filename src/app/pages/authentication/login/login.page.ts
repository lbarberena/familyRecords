import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  authForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              public toastController: ToastController) { }

  ngOnInit() {
    this.validation();

    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
      password: ['', Validators.required]
    });
  }

  validation() {
    const token = localStorage.getItem('auth-token');
    const userFamily = localStorage.getItem('userFamily');
    const userId = localStorage.getItem('userId');

    if ( token ) {
      this.router.navigateByUrl(`/tabs/medical-records/medicalRecord/${userId}/${userFamily}`);
    }
  }

  async login() {
    await this.authService.Login(this.authForm.value).subscribe(async res => {
          if ( res.success ) {
            localStorage.setItem('auth-token', res.data.token);
            localStorage.setItem('userFamily', res.data.userFamily);
            localStorage.setItem('user', res.data.username);
            localStorage.setItem('userId', res.data.userId);
            localStorage.setItem('name', res.data.name);
            const TOAST = await this.toastController.create({
              duration: 10,
              message: res.msg
            });
            await TOAST.present();
            await this.router.navigateByUrl(`/tabs/medical-records/medicalRecord/${res.data.userId}/${res.data.userFamily}`);
          } else if (res.success === false) {
            this.ereaseToken(res.msg);
            const TOAST = await this.toastController.create({
              duration: 10,
              message: res.msg
            });
            await TOAST.present();
          }

        }, error => {
          this.ereaseToken(error.msg);
        }
    );
  }

  async ereaseToken(msj: string) {
    const TOAST = await this.toastController.create({
      duration: 10,
      message: msj
    });
    await TOAST.present();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userFamily');
    localStorage.removeItem('name');
  }

  async Register() {
    await this.router.navigateByUrl('/auth/register');
  }

  async ForgotPassword() {
    await this.router.navigateByUrl('/auth/forgot-password');
  }

}
