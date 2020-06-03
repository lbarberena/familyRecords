import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordsPage } from './medical-records.page';
import {AdminMedicalRecordsPage} from './admin-medical-records/admin-medical-records.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalRecordsPage,
  },
  {
    path: 'medicalRecord/:userId/:userFamily',
    component: MedicalRecordsPage,
  },
  {
    path: 'adminMedicalRecord/:userId/:userFamily',
    component: AdminMedicalRecordsPage,
  },
  {
    path: 'adminMedicalRecord/:userId/:userFamily/:id',
    component: AdminMedicalRecordsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
