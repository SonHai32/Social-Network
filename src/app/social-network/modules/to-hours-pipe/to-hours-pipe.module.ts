import { ToHoursPipe } from './../../pipes/to-hours.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ToHoursPipe],
  exports: [ToHoursPipe]
})
export class ToHoursPipeModule { }
