import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BipformComponent } from './bipform/bipform.component';
import { ReductionGoalFormComponent } from './reduction-goal-form/reduction-goal-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    BipformComponent,
    ReductionGoalFormComponent
  ],
  exports: [
    BipformComponent,
    ReductionGoalFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    
  ]
})
export class ComponentsModule { }
