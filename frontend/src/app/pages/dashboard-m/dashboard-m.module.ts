import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardMPageRoutingModule } from './dashboard-m-routing.module';

import { DashboardMPage } from './dashboard-m.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardMPageRoutingModule,
    SharedModule,
  ],
  declarations: [DashboardMPage]
})
export class DashboardMPageModule {}
