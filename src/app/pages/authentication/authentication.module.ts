import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { LoginPage } from './login/login.page';
import {RegisterPage} from './register/register.page';
import {ForgotPasswordPage} from './forgot-password/forgot-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthenticationRoutingModule
  ],
  declarations: [LoginPage, RegisterPage, ForgotPasswordPage]
})
export class AuthenticationModule {}
