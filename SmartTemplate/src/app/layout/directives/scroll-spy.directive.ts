import { Directive, ElementRef, Input, HostListener, Inject, Renderer } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Directive({
    selector: '[appScrollSpy]'
})

export class ScrollSpyDirective {
    @Input() appScrollSpy: number;
    @Input('className') className: string;
    lastScrollTop: number;
    scrollUp: boolean;
    constructor(
        private el: ElementRef,
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer
    ) {
        this.lastScrollTop = 0;
    }

    /**
     * This function handle scroll event.
     * When scroll form, left and right content will be fix at top position.
     * If height of content larger than window height, content will be scrolled to bottom and fixed after
     */
    @HostListener('window:scroll')
    onWindowScroll() {
        if (window.scrollY > this.lastScrollTop) {
            this.scrollUp = false;
        } else {
            this.scrollUp = true;
        }
        this.lastScrollTop = window.scrollY;
        const childEle = this.el.nativeElement.children[0];
        // fixed if content height short than window height
        if (childEle) {
            if (childEle.offsetHeight < window.innerHeight) {
                if (this.document.documentElement.scrollTop > this.appScrollSpy) {
                    this.renderer.setElementClass(this.el.nativeElement, this.className, true);
                } else {
                    this.renderer.setElementClass(this.el.nativeElement, this.className, false);
                }
            } else {
                // continue scroll to the bottom of content and fixed
                const revertClass = this.className + '-revert';
                if (window.innerHeight - (childEle.offsetHeight + childEle.getBoundingClientRect().top) > 20 && this.scrollUp === false) {
                    // scroll down will trigger this code
                    this.renderer.setElementClass(this.el.nativeElement, revertClass, true);
                } else if (window.scrollY < window.innerHeight - (childEle.offsetHeight + childEle.getBoundingClientRect().top - 100)
                            && this.scrollUp === true) {
                                // scroll up will trigger this code
                    this.renderer.setElementClass(this.el.nativeElement, revertClass, false);
                }
            }
        }
    }
}
