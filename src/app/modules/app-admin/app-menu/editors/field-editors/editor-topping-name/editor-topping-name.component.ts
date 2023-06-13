import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditToppingService } from '../../edit-topping/edit-topping-service/edit-topping.service';
import { MenuItemToppingExtendedData } from '../../edit-topping/edit-topping-service/edit-topping-extended-data';

@Component({
  selector: 'app-editor-topping-name',
  templateUrl: './editor-topping-name.component.html',
  styleUrls: ['./editor-topping-name.component.scss', '../common/field-editor.scss']
})
export class EditorToppingNameComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();
  nameField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);

  private static readonly invalidToppingNameError = 'ITEM_MAIL_TOPPING_INVALID_NAME';

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  constructor(
    accountService: AccountService,
    private editToppingService: EditToppingService
  ) {
    this.editToppingService.observeToppingData().pipe(
      tap(e => this.loadName(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.nameField.valueChanges.pipe(
      tap(() => this.updateName()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editToppingService.onSaveTry.pipe(
      tap(() => this.nameField.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private loadName(data: MenuItemToppingExtendedData | undefined) {
    this.nameField.setValue(data ? data.name : '')
    this.submitErrors()
  }

  private updateName() {
    const topping = this.editToppingService.getToppingData()

    this.submitErrors();

    if (topping.name != this.nameField.value) {
      topping.name = this.nameField.value === null ? '' : this.nameField.value;
      this.editToppingService.update(topping);
    }
  }

  private submitErrors() {
    if (this.nameField.valid) {
      this.editToppingService.removeError(EditorToppingNameComponent.invalidToppingNameError)
    } else {
      this.editToppingService.addError(EditorToppingNameComponent.invalidToppingNameError);
    }
  }
}

