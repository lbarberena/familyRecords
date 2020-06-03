import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewFamilyModalPage } from './new-family-modal/new-family-modal.page';

const routes: Routes = [
  {
    path: 'new-family-modal',
    component: NewFamilyModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalsRoutingModule {}
