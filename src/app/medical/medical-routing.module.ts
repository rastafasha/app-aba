import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/gaurd/auth.guard';
import { MedicalComponent } from './medical.component';

const routes: Routes = [
  {path:'', component:MedicalComponent,
  canActivate:[AuthGuard],
  children:[
    {
      path: 'roles',
      loadChildren: () =>
        import('./roles/roles.module').then((m) => m.RolesModule),
    },
    // {
    //   path: 'staffs',
    //   loadChildren: () =>
    //     import('./staff/staff.module').then((m) => m.StaffModule),
    // },
    // {
    //   path: 'specialities',
    //   loadChildren: () =>
    //     import('./specialitie/specialitie.module').then((m) => m.SpecialitieModule),
    // },
    {
      path: 'doctors',
      loadChildren: () =>
        import('./doctors/doctors.module').then((m) => m.DoctorsModule),
    },
    {
      path: 'patients',
      loadChildren: () =>
        import('./patient-m/patient-m.module').then((m) => m.PatientMModule),
    },
    {
      path: 'bip',
      loadChildren: () =>
        import('./bip/bip.module').then((m) => m.BipModule),
    },
    {
      path: 'insurance',
      loadChildren: () =>
        import('./insurance/insurance.module').then((m) => m.InsuranceModule),
    },
  ]  
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
