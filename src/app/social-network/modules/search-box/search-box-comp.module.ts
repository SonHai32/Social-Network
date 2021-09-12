import { RouterModule } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzListModule } from 'ng-zorro-antd/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [SearchBoxComponent],
  imports: [
    CommonModule,
    RouterModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzListModule,
    NzSkeletonModule,
    ScrollingModule,
  ],
  exports: [SearchBoxComponent]
})
export class SearchBoxCompModule { }
