import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceEditComponent } from './insurance-edit/insurance-edit.component';
import { InsuranceAddComponent } from './insurance-add/insurance-add.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { InsuranceViewComponent } from './insurance-view/insurance-view.component';


@NgModule({
  declarations: [
    InsuranceComponent,
    InsuranceListComponent,
    InsuranceEditComponent,
    InsuranceAddComponent,
    InsuranceViewComponent
  ],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class InsuranceModule { }
