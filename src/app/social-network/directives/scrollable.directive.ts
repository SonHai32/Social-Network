import { Directive, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScrollable]',
})
export class ScrollableDirective {
  @Output() scrollPosition = new EventEmitter();
  constructor() {}

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    window.addEventListener('scroll', () => {
      try {
        let pos =
          (document.documentElement.scrollTop || document.body.scrollTop) +
          document.documentElement.offsetHeight;
        let max = document.documentElement.scrollHeight;
        if (pos >= max) {
          this.scrollPosition.emit('bottom');
        }
      } catch (err) {}
    });
  }
}
