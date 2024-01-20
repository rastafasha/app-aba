import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicalRoutingModule } from './medical-routing.module';
import { MedicalComponent } from './medical.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MedicalComponent
  ],
  imports: [
    CommonModule,
    MedicalRoutingModule,
    SharedModule,
    CoreModule
  ]
})
export class MedicalModule { }
