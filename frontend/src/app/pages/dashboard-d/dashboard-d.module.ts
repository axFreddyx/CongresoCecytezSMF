import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardDPageRoutingModule } from './dashboard-d-routing.module';

import { DashboardDPage } from './dashboard-d.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardDPageRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardDPage]
})
export class DashboardDPageModule {}
