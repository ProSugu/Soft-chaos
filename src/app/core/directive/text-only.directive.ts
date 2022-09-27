import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTextOnly]'
})
export class TextOnlyDirective {

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = initalValue.replace(/[^a-zA-Z]*/g, '');
    if ( initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
