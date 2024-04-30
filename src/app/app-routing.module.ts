import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './shared/gaurd/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  {
    path: '',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'medical',
    loadChildren: () => import('./medical/medical.module').then((m) => m.MedicalModule),
  },
  {
    path: 'doctors',
    loadChildren: () =>
      import('./medical/doctors/doctors.module').then((m) => m.DoctorsModule),
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./medical/patient-m/patient-m.module').then((m) => m.PatientMModule),
  },
  {
    path: 'roles',
    loadChildren: () => import('./medical/roles/roles.module').then((m) => m.RolesModule),
  },
  {
    path: 'insurance',
    loadChildren: () =>
      import('./medical/insurance/insurance.module').then((m) => m.InsuranceModule),
  },
  {
    path: 'bip',
    loadChildren: () => import('./medical/bip/bip.module').then((m) => m.BipModule),
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./medical/location/location.module').then((m) => m.LocationModule),
  },
  {
    path: 'note-rbt',
    loadChildren: () =>
      import('./medical/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'note-bcba',
    loadChildren: () =>
      import('./medical/notes-bcba/notes-bcba.module').then((m) => m.NotesBcbaModule),
  },
  {
    path: 'client-report',
    loadChildren: () =>
      import('./medical/client-report/client-report.module').then((m) => m.ClientReportModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./error/error.module').then((m) => m.ErrorModule),
  },
  // {
  //   path: 'billing',
  //   loadChildren: () =>
  //     import('./medical/billing/billing.module').then((m) => m.BillingModule),
  // },
  {
    path: '**',
    redirectTo: 'error/error404',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes),
    RouterModule.forRoot(routes,{
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
