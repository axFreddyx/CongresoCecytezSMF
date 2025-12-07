import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardAPCPageRoutingModule } from './dashboard-a-p-c-routing.module';

import { DashboardAPCPage } from './dashboard-a-p-c.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardAPCPageRoutingModule
    ,SharedModule,
  ],
  declarations: [DashboardAPCPage]
})
export class DashboardAPCPageModule {}
