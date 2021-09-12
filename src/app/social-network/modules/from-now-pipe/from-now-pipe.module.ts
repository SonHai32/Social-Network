import { FromNowPipe } from './../../pipes/from-now.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [FromNowPipe],
  exports: [FromNowPipe]
})
export class FromNowPipeModule { }
