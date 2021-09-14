import { NzImageModule } from 'ng-zorro-antd/image';
import { ImageDisplayComponent } from './../../components/image-display/image-display.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ImageDisplayComponent],
  imports: [
    CommonModule,
    NzImageModule,
  ],
  exports: [ImageDisplayComponent]
})
export class ImageDisplayCompModule { }
