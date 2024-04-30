import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BipComponent } from './bip.component';
import { BipattentionComponent } from './bipattention/bipattention.component';
import { BipProfileComponent } from './bip-profile/bip-profile.component';

const routes: Routes = [
  {path:'', component:BipComponent,
  children:[
    // {
    //   path:'goal/add', component:SustitutionGoalFormComponent
    // },
    // {
    //   path:'list', component:ListAppointmentsComponent
    // },
    {
      path:'profile/:patient_id', component:BipProfileComponent
    },
    {
      path:'attention/:patient_id', component:BipattentionComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BipRoutingModule { }
