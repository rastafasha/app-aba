import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteRbtComponent } from './note-rbt/note-rbt.component';
import { NotesByClientComponent } from './notes-by-client/notes-by-client.component';
import { EditNoteRbtComponent } from './edit-note-rbt/edit-note-rbt.component';
import { NoteRbtViewComponent } from './note-rbt-view/note-rbt-view.component';

const routes: Routes = [
  {path:'', component:NotesComponent,
  children:[
    {
      path:':patient_id', component:NoteRbtComponent
    },
    {
      path:'edit/:id', component:EditNoteRbtComponent
    },
    {
      path:'listbyclient/:id', component:NotesByClientComponent
    },
    {
      path:'view/:id', component:NoteRbtViewComponent
    },
    
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
