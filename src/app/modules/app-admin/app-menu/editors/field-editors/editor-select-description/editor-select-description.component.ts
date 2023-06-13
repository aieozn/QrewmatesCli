import { Component, OnDestroy } from '@angular/core';
import { EditSelectService } from '../../edit-select/edit-select-service/edit-select.service';
import { AccountService } from '@common/account-utils/services/account.service';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItemSelectExtendedData } from '../../edit-select/edit-select-service/edit-select-extended-data';

@Component({
  selector: 'app-editor-select-description',
  templateUrl: './editor-select-description.component.html',
  styleUrls: ['./editor-select-description.component.scss', '../common/field-editor.scss']
})
export class EditorSelectDescriptionComponent implements OnDestroy {

  private static readonly invalidSelectDescriptionError = 'ITEM_MAIL_SELECT_INVALID_DESCRIPTION';

  private readonly onDestroy = new Subject<void>();

  descriptionField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);

  constructor(
    accountService: AccountService,
    private editSelectService: EditSelectService
  ) {
    this.editSelectService.observeSelectData().pipe(
      tap(e => this.loadDescription(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.descriptionField.valueChanges.pipe(
      tap(() => this.updateDescription()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editSelectService.onSaveTry.pipe(
      tap(() => this.descriptionField.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private loadDescription(data: MenuItemSelectExtendedData | undefined) {
    this.descriptionField.setValue(data?.description ? data.description : '')
    this.submitErrors()
  }

  private updateDescription() {
    const select = this.editSelectService.getSelectData()

    this.submitErrors();

    if (select.description != this.descriptionField.value) {
      select.description = this.descriptionField.value === null ? '' : this.descriptionField.value;
      this.editSelectService.update(select);
    }
  }

  private submitErrors() {
    if (this.descriptionField.valid) {
      this.editSelectService.removeError(EditorSelectDescriptionComponent.invalidSelectDescriptionError)
    } else {
      this.editSelectService.addError(EditorSelectDescriptionComponent.invalidSelectDescriptionError);
    }
  }
}
