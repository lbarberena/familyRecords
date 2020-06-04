import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalsRoutingModule } from './modals-routing.module';

import { NewFamilyModalPage } from './new-family-modal/new-family-modal.page';
import {MedicalRecordInfoModalPage} from './medical-record-info-modal/medical-record-info-modal.page';
import {EditAccountModalPage} from './edit-account-modal/edit-account-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewFamilyModalPage, MedicalRecordInfoModalPage, EditAccountModalPage]
})
export class ModalsModule {}
