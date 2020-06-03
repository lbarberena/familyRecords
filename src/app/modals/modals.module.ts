import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalsRoutingModule } from './modals-routing.module';

import { NewFamilyModalPage } from './new-family-modal/new-family-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewFamilyModalPage]
})
export class ModalsModule {}
