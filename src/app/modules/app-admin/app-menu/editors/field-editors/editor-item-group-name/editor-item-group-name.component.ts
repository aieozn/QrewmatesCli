import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditItemGroupService } from '../../edit-item-group/edit-item-group-service/edit-item-group-service';

@Component({
  selector: 'app-editor-item-group-name',
  templateUrl: './editor-item-group-name.component.html',
  styleUrls: ['./editor-item-group-name.component.scss', '../common/field-editor.scss']
})
export class EditorItemGroupNameComponent implements OnDestroy {
  private static readonly invalidItemGroupNameError = 'ITEM_MAIL_GROUP_INVALID_NAME';

  itemGroupName : FormControl<string | null> = new FormControl<string>('', [Validators.required, Validators.maxLength(255)]);

  private readonly onDestroy = new Subject<void>();

  constructor(private editItemGroupService: EditItemGroupService) {
    this.itemGroupName.valueChanges.pipe(
      tap(value => this.updateName(value)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private updateName(value: string | null) {
    const itemMailGroup = this.editItemGroupService.groupData.getValue()
    if (!itemMailGroup) { throw 'Item not defined'; }

    if (this.itemGroupName.valid) {
      this.editItemGroupService.removeError(EditorItemGroupNameComponent.invalidItemGroupNameError)
    } else {
      this.editItemGroupService.addError(EditorItemGroupNameComponent.invalidItemGroupNameError);
    }

    itemMailGroup.name = value === null ? '' : value;
    this.editItemGroupService.isUpdated.next(true);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
