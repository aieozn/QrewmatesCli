import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditItemGroupService } from '../../edit-item-group/edit-item-group-service/edit-item-group-service';

@Component({
  selector: 'app-editor-item-group-name',
  templateUrl: './editor-item-group-name.component.html'
})
export class EditorItemGroupNameComponent implements OnDestroy {
  private static readonly invalidItemGroupNameError = 'ITEM_MAIL_GROUP_INVALID_NAME';

  nameField : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);

  private readonly onDestroy = new Subject<void>();

  constructor(private editItemGroupService: EditItemGroupService) {
    this.editItemGroupService.observeGroupData().pipe(
      tap(e => this.loadName(e?.name)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editItemGroupService.onSaveTry.pipe(
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

  private onUpdateName() {
    const itemMailGroup = this.editItemGroupService.getGroupData()
    this.submitErrors();

    if (itemMailGroup.name != this.nameField.value) {
      itemMailGroup.name = this.nameField.value === null ? '' : this.nameField.value;
      this.editItemGroupService.update(itemMailGroup);
    }
  }

  private submitErrors() {
    if (this.nameField.valid) {
      this.editItemGroupService.removeError(EditorItemGroupNameComponent.invalidItemGroupNameError)
    } else {
      this.editItemGroupService.addError(EditorItemGroupNameComponent.invalidItemGroupNameError);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
