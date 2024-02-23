import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BipComponent } from './bip.component';
import { BipattentionComponent } from './bipattention/bipattention.component';
import { BipProfileComponent } from './bip-profile/bip-profile.component';
import { SustitutionGoalFormComponent } from './components/sustitution-goal-form/sustitution-goal-form.component';

const routes: Routes = [
  {path:'', component:BipComponent,
  children:[
    {
      path:'goal/add', component:SustitutionGoalFormComponent
    },
    // {
    //   path:'list', component:ListAppointmentsComponent
    // },
    {
      path:'profile/:id', component:BipProfileComponent
    },
    {
      path:'attention/:id', component:BipattentionComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BipRoutingModule { }
