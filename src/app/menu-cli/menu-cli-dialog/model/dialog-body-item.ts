import { Type } from '@angular/core';
import { CliDialogBodyContent } from './cli-dialog-body-content';

export class DialogBodyItem {
  constructor(
    public component: Type<CliDialogBodyContent>,
    public data: any,
    public title: string | undefined
  ) {}
}