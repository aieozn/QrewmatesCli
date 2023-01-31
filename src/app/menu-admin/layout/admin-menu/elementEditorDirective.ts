import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[elementEditorHost]',
})
export class ElementEditorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}