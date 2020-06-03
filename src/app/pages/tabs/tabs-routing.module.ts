import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuardService} from '../../services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'medical-records',
        canActivate: [AuthGuardService],
        loadChildren: () => import('../medical-records/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'supermarket',
        canActivate: [AuthGuardService],
        loadChildren: () => import('../supermarket/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'accounts',
        canActivate: [AuthGuardService],
        loadChildren: () => import('../accounts/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/medical-records',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/medical-records',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
