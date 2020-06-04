import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFamilyModalPage } from './new-family-modal/new-family-modal.page';
import {MedicalRecordInfoModalPage} from './medical-record-info-modal/medical-record-info-modal.page';
import {EditAccountModalPage} from './edit-account-modal/edit-account-modal.page';

const routes: Routes = [
  {
    path: 'new-family-modal',
    component: NewFamilyModalPage
  },
  {
    path: 'medical-record-info-modal',
    component: MedicalRecordInfoModalPage
  },
  {
    path: 'edit-account-modal',
    component: EditAccountModalPage
  },
  {
    path: 'view-family-modal',
    loadChildren: () => import('./view-family-modal/view-family-modal.module').then( m => m.ViewFamilyModalPageModule)
  },
  {
    path: 'edit-family-users-modal',
    loadChildren: () => import('./edit-family-users-modal/edit-family-users-modal.module').then( m => m.EditFamilyUsersModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsRoutingModule {}
