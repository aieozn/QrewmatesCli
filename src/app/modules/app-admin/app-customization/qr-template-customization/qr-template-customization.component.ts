import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectThemeDialogComponent } from '../dialog/select-theme-dialog/select-theme-dialog.component';
import { FullWidthDialogService } from '@common/full-width-dialog/service/full-width-dialog.service';

@Component({
  selector: 'app-qr-template-customization',
  templateUrl: './qr-template-customization.component.html',
  styleUrls: ['../customization-component.scss', './qr-template-customization.component.scss']
})
export class QrTemplateCustomizationComponent {

  constructor(
    public dialog: MatDialog
  ) {

  }

  chooseTheme() {
    this.dialog.open(SelectThemeDialogComponent, FullWidthDialogService.getDefaultGenericDialogConfig({}))
  }
}
