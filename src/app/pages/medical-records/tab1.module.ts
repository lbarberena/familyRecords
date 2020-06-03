import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MedicalRecordsPage } from './medical-records.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {AdminMedicalRecordsPage} from './admin-medical-records/admin-medical-records.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MedicalRecordsPage, AdminMedicalRecordsPage]
})
export class Tab1PageModule {}
