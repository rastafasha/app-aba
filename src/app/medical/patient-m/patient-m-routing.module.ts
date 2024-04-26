import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientMComponent } from './patient-m.component';
import { AddPatientMComponent } from './add-patient-m/add-patient-m.component';
import { ListPatientMComponent } from './list-patient-m/list-patient-m.component';
import { EditPatientMComponent } from './edit-patient-m/edit-patient-m.component';
import { ProfilePatientMComponent } from './profile-patient-m/profile-patient-m.component';
import { ClientLogReportComponent } from './client-log-report/client-log-report.component';

const routes: Routes = [
  {path:'', component:PatientMComponent,
  children:[
    {
      path:'add', component:AddPatientMComponent
    },
    {
      path:'list', component:ListPatientMComponent
    },
    {
      path:'clientlogreport', component:ClientLogReportComponent
    },
    {
      path:'list/edit/:id', component:EditPatientMComponent
    },
    {
      path:'profile/:id', component:ProfilePatientMComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientMRoutingModule { }
