import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';

@Injectable()
export class DomService {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) { }

    appendComponentToBody(element: any, parentElement: HTMLElement) {
        const componentRef = this.componentFactoryResolver
            .resolveComponentFactory(element)
            .create(this.injector);

        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;
        parentElement.appendChild(domElem);
    }

}
