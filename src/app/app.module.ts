import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';
import {AuthenticationModule} from './pages/authentication/authentication.module';
import {LoginPage} from './pages/authentication/login/login.page';
import {RegisterPage} from './pages/authentication/register/register.page';

export function tokenGetterFactory() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
      LoginPage,
      RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthenticationModule,
    JwtModule.forRoot({
      config: {
        headerName: 'Authorization',
        authScheme: '',
        tokenGetter: tokenGetterFactory,
        whitelistedDomains: ['localhost:8000', 'localhost:8100', 'localhost:8080', 'localhost:4200', 'localhost:3000',
          'api-tech-nic.herokuapp.com']
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    ErrorService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
