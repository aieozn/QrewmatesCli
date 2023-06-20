import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditToppingService } from '../../edit-topping/edit-topping-service/edit-topping.service';
import { MenuItemToppingExtendedData } from '../../edit-topping/edit-topping-service/edit-topping-extended-data';

@Component({
  selector: 'app-editor-topping-description',
  templateUrl: './editor-topping-description.component.html'
})
export class EditorToppingDescriptionComponent implements OnDestroy {

  private static readonly invalidToppingDescriptionError = 'ITEM_MAIL_TOPPING_INVALID_DESCRIPTION';

  private readonly onDestroy = new Subject<void>();

  descriptionField : FormControl<string | null> = new FormControl<string>('', [Validators.maxLength(255)]);

  constructor(
    accountService: AccountService,
    private editToppingService: EditToppingService
  ) {
    this.editToppingService.observeToppingData().pipe(
      tap(e => this.loadDescription(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.descriptionField.valueChanges.pipe(
      tap(() => this.updateDescription()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editToppingService.onSaveTry.pipe(
      tap(() => this.descriptionField.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private loadDescription(data: MenuItemToppingExtendedData | undefined) {
    this.descriptionField.setValue(data?.description ? data.description : '')
    this.submitErrors()
  }

  private updateDescription() {
    const topping = this.editToppingService.getToppingData()

    this.submitErrors();

    if (topping.description != this.descriptionField.value) {
      topping.description = this.descriptionField.value === null ? '' : this.descriptionField.value;
      this.editToppingService.update(topping);
    }
  }

  private submitErrors() {
    if (this.descriptionField.valid) {
      this.editToppingService.removeError(EditorToppingDescriptionComponent.invalidToppingDescriptionError)
    } else {
      this.editToppingService.addError(EditorToppingDescriptionComponent.invalidToppingDescriptionError);
    }
  }
}

