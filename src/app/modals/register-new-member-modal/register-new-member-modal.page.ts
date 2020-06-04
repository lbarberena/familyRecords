import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {FamilyService} from '../../services/family.service';

@Component({
  selector: 'app-register-new-member-modal',
  templateUrl: './register-new-member-modal.page.html',
  styleUrls: ['./register-new-member-modal.page.scss'],
})
export class RegisterNewMemberModalPage implements OnInit {

  actualDate = new Date();
  registerForm: FormGroup;
  confirmPassword;

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
      family: [localStorage.getItem('userFamily')],
      date: [this.actualDate],
      active: [true],
      loggedin: [false],
      role: ['familia']
    });
  }

  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      data: true
    });
  }

  Register() {
    this.registerForm.patchValue({
      loggedin: false,
      active: true
    });
    const form = this.registerForm.value;
    this.authService.Register( form ).subscribe( async res => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 30,
          message: res.msg
        });
        await TOAST.present();
        this.closeModal();
      } else {
        const TOAST = await this.toastController.create({
          duration: 30,
          message: res.msg
        });
        await TOAST.present();
      }
    });
  }

}
