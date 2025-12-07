import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprobantesPageRoutingModule } from './comprobantes-routing.module';

import { ComprobantesPage } from './comprobantes.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComprobantesPageRoutingModule,
    SharedModule,
  ],
  declarations: [ComprobantesPage]
})
export class ComprobantesPageModule {}
