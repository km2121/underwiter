import { Directive, ElementRef, Input, HostListener, Inject, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
    selector: '[appScrollSpy]'
})

export class ScrollSpyDirective {
    @Input() appScrollSpy: number;
    @Input('className') className: string;
    constructor(
        private el: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer
    ) {
    }

    @HostListener('window:scroll')
    onWindowScroll() {
        if (this.document.documentElement.scrollTop > this.appScrollSpy) {
            this.renderer.setElementClass(this.el.nativeElement, this.className, true);
        } else {
            this.renderer.setElementClass(this.el.nativeElement, this.className, false);
        }
    }
}
