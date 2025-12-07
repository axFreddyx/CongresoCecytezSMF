import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardAPCPage } from './dashboard-a-p-c.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardAPCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardAPCPageRoutingModule {}
