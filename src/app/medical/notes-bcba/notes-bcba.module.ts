import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from '../bip/components/components.module';
import { NoteBcbaByClientComponent } from './note-bcba-by-client/note-bcba-by-client.component';
import { NoteBcbaEditComponent } from './note-bcba-edit/note-bcba-edit.component';
import { NoteBcbaViewComponent } from './note-bcba-view/note-bcba-view.component';
import { NotesBcbaRoutingModule } from './notes-bcba-routing.module';
import { NotesBcbaComponent } from './notes-bcba.component';
import { NoteBcbaComponent } from './note-bcba/note-bcba.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    NotesBcbaComponent,
    NoteBcbaViewComponent,
    NoteBcbaByClientComponent,
    NoteBcbaEditComponent,
    NoteBcbaComponent
  ],
  exports: [
    NotesBcbaComponent,
    NoteBcbaViewComponent,
    NoteBcbaByClientComponent,
    NoteBcbaEditComponent
  ],
  imports: [
    CommonModule,
    NotesBcbaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    ComponentsModule,
    PipesModule
  ]
})
export class NotesBcbaModule { }
