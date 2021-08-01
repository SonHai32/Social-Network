import {
  Directive,
  Output,
  EventEmitter,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appScrollable]',
})
export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();
  constructor() {}
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    try {
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
       if(pos >= max )   {
        this.scrollPosition.emit('bottom')
       }else if(window.scrollY < 100){
         this.scrollPosition.emit('top')
       }
    } catch (err) {}
  }
}
