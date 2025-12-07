import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardMPage } from './dashboard-m.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardMPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardMPageRoutingModule {}
