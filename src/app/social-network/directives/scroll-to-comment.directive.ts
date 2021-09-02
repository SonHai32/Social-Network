import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appScrollTo]',
})
export class ScrollToCommentDirective {
  @Input() el!: HTMLElement;
  @Input() isChild!: boolean;
  constructor() {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.isChild) {
      //  this.el.scrollIntoView({behavior: 'smooth'});
      setTimeout(() => {
        this.el.focus()
        this.el.scrollIntoView({behavior: 'smooth', block: 'center'})
      }, 200);
    }
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
}
