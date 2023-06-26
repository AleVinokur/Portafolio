import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[smoothScroll]'
})
export class SmoothScrollDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click')
  onClick() {
    const targetId = this.elementRef.nativeElement.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
