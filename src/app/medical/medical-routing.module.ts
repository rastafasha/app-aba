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
    {
      path: 'location',
      loadChildren: () =>
        import('./location/location.module').then((m) => m.LocationModule),
    },
    {
      path: 'note-rbt',
      loadChildren: () =>
        import('./notes/notes.module').then((m) => m.NotesModule),
    },
    {
      path: 'note-bcba',
      loadChildren: () =>
        import('./notes-bcba/notes-bcba.module').then((m) => m.NotesBcbaModule),
    },
    {
      path: 'billing',
      loadChildren: () =>
        import('./billing/billing.module').then((m) => m.BillingModule),
    },
    {
      path: 'client-report',
      loadChildren: () =>
        import('./client-report/client-report.module').then((m) => m.ClientReportModule),
    },
  ]  
}
];

@NgModule({
  imports: [
    // RouterModule.forChild(routes)
    RouterModule.forRoot(routes,{
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class MedicalRoutingModule { }
