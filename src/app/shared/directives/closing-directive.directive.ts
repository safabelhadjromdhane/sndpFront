import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClosingDirective]',
  standalone: true
})
export class ClosingDirectiveDirective {
  @Output() appClosingDirective = new EventEmitter<void>();
  constructor(private el:ElementRef) { }

  @HostListener('document:click', ['$event'])
  onClick(event: Event): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.appClosingDirective.emit();
    }
  }

}
