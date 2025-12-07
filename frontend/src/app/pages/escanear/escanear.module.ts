import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EscanearPageRoutingModule } from './escanear-routing.module';

import { EscanearPage } from './escanear.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EscanearPageRoutingModule,
    SharedModule,
  ],
  declarations: [EscanearPage]
})
export class EscanearPageModule {}
