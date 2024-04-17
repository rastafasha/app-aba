import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientReportRoutingModule } from './client-report-routing.module';
import { ReportByClientComponent } from './report-by-client/report-by-client.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    ReportByClientComponent
  ],
  imports: [
    CommonModule,
    ClientReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ]
})
export class ClientReportModule { }
