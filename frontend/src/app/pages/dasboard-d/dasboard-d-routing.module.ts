import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DasboardDPage } from './dasboard-d.page';

const routes: Routes = [
  {
    path: '',
    component: DasboardDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DasboardDPageRoutingModule {}
