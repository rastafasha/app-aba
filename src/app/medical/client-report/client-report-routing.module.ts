import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientReportComponent } from './client-report.component';
import { ReportByClientComponent } from './report-by-client/report-by-client.component';

const routes: Routes = [
  {path:'', component:ClientReportComponent,
  children:[
    
    // {
    //   path:'list', component:BillingListComponent
    // },
    {
      path:'byclient/:patient_id', component:ReportByClientComponent
    },
    // {
    //   path:'attention/:id', component:BipattentionComponent
    // },
    
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientReportRoutingModule { }
