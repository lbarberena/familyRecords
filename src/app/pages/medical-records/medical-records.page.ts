import {Component, OnInit} from '@angular/core';
import {MedicalRecordsService} from '../../services/medical-records.service';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {NewFamilyModalPage} from '../../modals/new-family-modal/new-family-modal.page';
import {MedicalRecordInfoModalPage} from '../../modals/medical-record-info-modal/medical-record-info-modal.page';

@Component({
  selector: 'app-records',
  templateUrl: 'medical-records.page.html',
  styleUrls: ['tab1.page.scss']
})
export class MedicalRecordsPage implements OnInit {

  userId: string;
  userFamily: string;
  medicalRecords = [];
  myMedicalRecords = [];
  loading = true;
  selected;
  searchInput;
  constructor(private medicalRecordsService: MedicalRecordsService,
              private router: Router,
              public modalController: ModalController) {}

  ngOnInit(): void {
    this.loading = true;
  }

  ionViewWillEnter() {
    this.userId = localStorage.getItem('userId');
    this.userFamily = localStorage.getItem('userFamily');
    this.selected = 'mines';
    this.GetMyMedicalRecords();
  }

  GetMedicalRecords() {
    this.medicalRecordsService.GET(this.userId, this.userFamily).subscribe( async res => {
      if ( res.success ) {
        this.medicalRecords = (await res.data);
        this.loading = false;
      }
    });
  }

  GetMyMedicalRecords() {
    this.medicalRecordsService.GetMines(this.userId, this.userFamily).subscribe( async res => {
      if ( res.success ) {
        this.myMedicalRecords = (await res.data);
        this.loading = false;
      }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
    this.medicalRecords = [];
    this.GetMedicalRecords();
  }

  NewRecord() {
    this.router.navigateByUrl(`/tabs/medical-records/adminMedicalRecord/${this.userId}/${this.userFamily}`);
  }

  async PresentModal(medicalRecordId: string, medicalRecordName: string) {
    localStorage.setItem('medicalRecordId', medicalRecordId);
    localStorage.setItem('medicalRecordName', medicalRecordName);
    const modal = await this.modalController.create({
      component: MedicalRecordInfoModalPage,
      cssClass: 'medical-records-info-modal-css'
    });

    modal.onDidDismiss().then( () => {
      this.ClearView();
      this.GetMyMedicalRecords();
      this.GetMedicalRecords();
    });
    return await modal.present();
  }

  ClearView() {
    this.medicalRecords = [];
    this.myMedicalRecords = [];
  }
}
