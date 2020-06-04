import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFamilyModalPage } from './new-family-modal/new-family-modal.page';
import {MedicalRecordInfoModalPage} from './medical-record-info-modal/medical-record-info-modal.page';
import {EditAccountModalPage} from './edit-account-modal/edit-account-modal.page';
import {ViewFamilyModalPage} from './view-family-modal/view-family-modal.page';
import {EditFamilyUsersModalPage} from './edit-family-users-modal/edit-family-users-modal.page';
import {ChangePasswordModalPage} from './change-password-modal/change-password-modal.page';
import {RegisterNewMemberModalPage} from './register-new-member-modal/register-new-member-modal.page';

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
    component: ViewFamilyModalPage
  },
  {
    path: 'edit-family-users-modal',
    component: EditFamilyUsersModalPage
  },
  {
    path: 'change-password-modal',
    component: ChangePasswordModalPage
  },
  {
    path: 'register-new-member-modal',
    component: RegisterNewMemberModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsRoutingModule {}
