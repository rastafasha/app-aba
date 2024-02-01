import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';
import { LocationAddComponent } from './location-add/location-add.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationEditComponent } from './location-edit/location-edit.component';

const routes: Routes = [
  {path:'', component:LocationComponent,
  children:[
    {
      path:'register', component:LocationAddComponent
    },
    {
      path:'list', component:LocationListComponent
    },
    {
      path:'list/edit/:id', component:LocationEditComponent
    },
    
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
