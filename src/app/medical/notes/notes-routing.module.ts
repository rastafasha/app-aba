import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteRbtComponent } from './note-rbt/note-rbt.component';
import { NotesByClientComponent } from './notes-by-client/notes-by-client.component';

const routes: Routes = [
  {path:'', component:NotesComponent,
  children:[
    {
      path:'rbt/:id', component:NoteRbtComponent
    },
    {
      path:'listbyclient/:id', component:NotesByClientComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
