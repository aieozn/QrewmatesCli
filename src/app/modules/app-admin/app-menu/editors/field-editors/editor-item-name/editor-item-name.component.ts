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

  nameField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);
  groupName: string | undefined;

  private readonly onDestroy = new Subject<void>();

  constructor(private editItemService: EditItemService) {
    this.editItemService.observeItemData().pipe(
      tap(e => this.loadName(e?.name)),
      tap(e => this.groupName = e?.menuItemGroupName),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editItemService.onSaveTry.pipe(
      tap(() => this.nameField.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.nameField.valueChanges.pipe(
      tap(() => this.onUpdateName()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private loadName(name: string | undefined) {
    this.nameField.setValue(name ? name : '');
    this.submitErrors();
  }

  submitErrors() {
    if (this.nameField.valid) {
      this.editItemService.removeError(EditorItemNameComponent.invalidItemNameError)
    } else {
      this.editItemService.addError(EditorItemNameComponent.invalidItemNameError);
    }
  }

  private onUpdateName() {
    const itemMailData = this.editItemService.getItemData()

    this.submitErrors();
    
    if (itemMailData.name != this.nameField.value) {
      itemMailData.name = this.nameField.value === null ? '' : this.nameField.value;
      this.editItemService.updateItem(itemMailData);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
