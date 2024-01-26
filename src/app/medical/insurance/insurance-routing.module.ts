import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceComponent } from './insurance.component';
import { InsuranceAddComponent } from './insurance-add/insurance-add.component';
import { InsuranceListComponent } from './insurance-list/insurance-list.component';
import { InsuranceEditComponent } from './insurance-edit/insurance-edit.component';

const routes: Routes = [
  {path:'', component:InsuranceComponent,
  children:[
    {
      path:'register', component:InsuranceAddComponent
    },
    {
      path:'list', component:InsuranceListComponent
    },
    {
      path:'list/edit/:id', component:InsuranceEditComponent
    },
    
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceRoutingModule { }
