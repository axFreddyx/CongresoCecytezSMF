import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DasboardDPageRoutingModule } from './dasboard-d-routing.module';

import { DasboardDPage } from './dasboard-d.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DasboardDPageRoutingModule,
    SharedModule,
  ],
  declarations: [DasboardDPage]
})
export class DasboardDPageModule {}
