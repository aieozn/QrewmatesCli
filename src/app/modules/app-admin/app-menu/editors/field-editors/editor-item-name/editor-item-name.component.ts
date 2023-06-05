import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EditItemService } from '../../edit-item/edit-item-service/edit-item.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-editor-item-name',
  templateUrl: './editor-item-name.component.html',
  styleUrls: ['./editor-item-name.component.scss', '../common/field-editor.scss']
})
export class EditorItemNameComponent implements OnDestroy {

  private static readonly invalidItemNameError = 'ITEM_MAIL_INVALID_NAME';

  itemName : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);
  groupName: string | undefined;

  private readonly onDestroy = new Subject<void>();

  constructor(private editItemService: EditItemService) {
    this.itemName.valueChanges.pipe(
      tap(value => this.updateName(value)),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editItemService.itemData.pipe(
      tap(value => this.groupName = value?.menuItemGroupName),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.editItemService.onSaveTry.pipe(
      tap(() => this.itemName.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private updateName(value: string | null) {
    const itemMail = this.editItemService.itemData.getValue()
    if (!itemMail) { throw 'Item not defined'; }

    if (this.itemName.valid) {
      this.editItemService.removeError(EditorItemNameComponent.invalidItemNameError)
    } else {
      this.editItemService.addError(EditorItemNameComponent.invalidItemNameError);
    }

    itemMail.name = value === null ? '' : value;
    this.editItemService.isUpdated.next(true)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
