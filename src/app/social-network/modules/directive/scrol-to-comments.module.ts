import { ScrollToCommentDirective } from './../../directives/scroll-to-comment.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [ScrollToCommentDirective],

  exports: [ScrollToCommentDirective]
})
export class ScrolToCommentsModule { }
