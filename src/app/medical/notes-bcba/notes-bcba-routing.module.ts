import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteBcbaEditComponent } from './note-bcba-edit/note-bcba-edit.component';
import { NoteBcbaByClientComponent } from './note-bcba-by-client/note-bcba-by-client.component';
import { NoteBcbaViewComponent } from './note-bcba-view/note-bcba-view.component';
import { NotesBcbaComponent } from './notes-bcba.component';
import { NoteBcbaComponent } from './note-bcba/note-bcba.component';

const routes: Routes = [
  {path:'', component:NotesBcbaComponent,
  children:[
    {
      path:':patient_id', component:NoteBcbaComponent
    },
    {
      path:'edit/:id', component:NoteBcbaEditComponent
    },
    {
      path:'listbyclient/:id', component:NoteBcbaByClientComponent
    },
    {
      path:'view/:id', component:NoteBcbaViewComponent
    },
    
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesBcbaRoutingModule { }
