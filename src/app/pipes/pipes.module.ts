import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';



@NgModule({
  declarations: [
    SecureResourceUrlPipe
  ],
  exports: [
    SecureResourceUrlPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
