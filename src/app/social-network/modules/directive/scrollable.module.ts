import { ScrollableDirective } from './../../directives/scrollable.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ScrollableDirective],
  exports: [ScrollableDirective],
})
export class ScrollableModule {}
