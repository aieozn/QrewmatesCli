import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dialogBodyHost]',
})
export class DialogBodyHost {
  constructor(public viewContainerRef: ViewContainerRef) { }
}