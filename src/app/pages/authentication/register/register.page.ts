import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {FamilyService} from '../../../services/family.service';
import {NewFamilyModalPage} from '../../../modals/new-family-modal/new-family-modal.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  title = '';
  registerForm: FormGroup;
  confirmPassword;
  ID: string;
  id = false;
  btnText = '';
  changePassword = true;
  families = [];
  actualDate = new Date();
  hasFamily = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              public toastController: ToastController,
              private route: ActivatedRoute,
              private familyService: FamilyService,
              private alertCtrl: AlertController,
              public modalController: ModalController) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      name: ['', Validators.required],
      family: ['', Validators.required],
      date: [this.actualDate],
      active: [''],
      loggedin: [''],
      role: ['familia']
    });
  }

  ionViewWillEnter() {
    this.ID = this.route.snapshot.paramMap.get('id');
    this.GetFamilies();
    if ( this.ID ) {
      this.title = 'Editar Cuenta';
      this.btnText = 'Actualizar Cuenta';
      this.id = true;
    } else {
      this.AskForFamily();
      this.title = 'Nueva Cuenta';
      this.btnText = 'Guardar Cuenta';
      this.id = false;
    }
  }

  SAVE() {
    this.registerForm.patchValue({
      loggedin: true,
      active: true
    });
    const form = this.registerForm.value;
    if ( !this.ID ) {
      this.Register(form);
    } else {
      this.Update();
    }
  }

  Register(form) {
    this.authService.Register( form ).subscribe( async res => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 30,
          message: res.msg
        });
        await TOAST.present();
        this.login(res.data.username, this.registerForm.value.password);
      } else {
        const TOAST = await this.toastController.create({
          duration: 30,
          message: res.msg
        });
        await TOAST.present();
      }
    });
  }

  Update() {
    const data = {
      username: this.registerForm.value.username,
      name: this.registerForm.value.name,
      role: this.registerForm.value.role,
      email: this.registerForm.value.email
    };
    this.authService.PUT(this.ID, data ).subscribe( async res => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 10,
          message: res.msg
        });
        await TOAST.present();
        // await this.router.navigateByUrl('/accounts');
      } else {
        const TOAST = await this.toastController.create({
          duration: 10,
          message: res.msg
        });
        await TOAST.present();
      }
    });
  }

  GetFamilies() {
    this.familyService.GET().subscribe( async res => {
      this.families = (await res.data);
    });
  }

  async AskForFamily() {
    const alert = await this.alertCtrl.create({
      header: '¿Ya posees una familia creada en la plataforma?',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.hasFamily = true;
          }
        },
        {
          text: 'No',
          handler: () => {
            this.hasFamily = false;
            this.presentModal();
          }
        }
      ]
    });
    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: NewFamilyModalPage,
      cssClass: 'new-family-modal-css'
    });

    modal.onDidDismiss().then( (data) => {
      this.registerForm.patchValue({
        family: data.data.data.familyName
      });
    });
    return await modal.present();
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
}
