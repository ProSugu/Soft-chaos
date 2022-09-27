import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  @Input() allowDecimal = false;

  constructor(
    private elementRef: ElementRef
  ) { }

  @HostListener('input', ['$event']) onInputChange(event:any) {
    const initalValue = this.elementRef.nativeElement.value;
    this.elementRef.nativeElement.value = this.allowDecimal ? initalValue.replace(/[^0-9](\.[0-9]+)?$/g, ''):initalValue.replace(/[^0-9]*/g, '');
    if ( initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
