import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecureResourceUrlPipe } from './secure-resource-url.pipe';
import { TransformToDatePipe } from './transform-to-date.pipe';



@NgModule({
  declarations: [
    SecureResourceUrlPipe,
    TransformToDatePipe
  ],
  exports: [
    SecureResourceUrlPipe,
    TransformToDatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
