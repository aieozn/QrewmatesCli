import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditSelectService } from '../../edit-select/edit-select-service/edit-select.service';
import { MenuItemSelectExtendedData } from '../../edit-select/edit-select-service/edit-select-extended-data';

@Component({
  selector: 'app-editor-select-name',
  templateUrl: './editor-select-name.component.html',
  styleUrls: ['./editor-select-name.component.scss', '../common/field-editor.scss']
})
export class EditorSelectNameComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  nameField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);

  private static readonly invalidSelectNameError = 'ITEM_MAIL_SELECT_INVALID_NAME';

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  constructor(
    accountService: AccountService,
    private editSelectService: EditSelectService
  ) {
    this.editSelectService.observeSelectData().pipe(
      tap(e => this.loadName(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.nameField.valueChanges.pipe(
      tap(() => this.updateName()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private loadName(data: MenuItemSelectExtendedData | undefined) {
    this.nameField.setValue(data ? data.name : '')
    this.submitErrors()
  }

  private updateName() {
    const select = this.editSelectService.getSelectData()

    this.submitErrors();

    if (select.name != this.nameField.value) {
      select.name = this.nameField.value === null ? '' : this.nameField.value;
      this.editSelectService.update(select);
    }
  }

  private submitErrors() {
    if (this.nameField.valid) {
      this.editSelectService.removeError(EditorSelectNameComponent.invalidSelectNameError)
    } else {
      this.editSelectService.addError(EditorSelectNameComponent.invalidSelectNameError);
    }
  }
}
