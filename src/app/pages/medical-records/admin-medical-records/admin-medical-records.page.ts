import {Component, OnInit} from '@angular/core';
import {MedicalRecordsService} from '../../../services/medical-records.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastController} from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

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
  imageURI: string;

  private optionsCamera: CameraOptions = {
    quality: 100,
    targetWidth: 600,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  private optionsGallery: CameraOptions = {
    quality: 100,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(private medicalRecordsService: MedicalRecordsService,
              private router: Router,
              private formBuilder: FormBuilder,
              private toastController: ToastController,
              private route: ActivatedRoute,
              private camera: Camera) { }

  ngOnInit() {
    this.userFamily = this.route.snapshot.paramMap.get('userFamily');
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.newRecord = this.formBuilder.group({
      recordName: ['', Validators.required],
      description: [''],
      quantity: ['', Validators.required],
      date: [''],
      username: [''],
      imageURI: ['']
    });
  }

  SaveRecord() {
    this.newRecord.patchValue({
      date: this.CreateTheDate(),
      username: localStorage.getItem('user'),
      imageURI: this.imageURI
    });
    const form = this.newRecord.value;

    this.medicalRecordsService.POST(form, this.userId, this.userFamily).subscribe( async (res) => {
      if ( res.success ) {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'Registro Guardado'
        });
        await TOAST.present();
        await this.router.navigateByUrl(`/tabs/medical-records/medicalRecord/${this.userId}/${this.userFamily}`);
      } else {
        const TOAST = await this.toastController.create({
          duration: 15,
          message: 'Ocurrió un error al Guardar'
        });
        await TOAST.present();
      }
    });
  }

  CreateTheDate(): string {
    const newDate: string = this.date.substr(0, 10);
    const newHour: string = this.hour.substr(10, 29);
    return `${newDate}${newHour}`;
  }

  OpenCamera() {
    this.camera.getPicture(this.optionsCamera).then((imageData) => this.imageURI = imageData,
        (err) => {
      // Handle error
      console.log(err);
    });
  }

  OpenGallery() {
    this.camera.getPicture(this.optionsGallery).then((imageData) => this.imageURI = imageData,
        (err) => {
      // Handle error
      console.log(err);
    });
  }

}
