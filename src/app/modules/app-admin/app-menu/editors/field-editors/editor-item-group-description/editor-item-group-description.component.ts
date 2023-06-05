import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditItemGroupService } from '../../edit-item-group/edit-item-group-service/edit-item-group-service';

@Component({
  selector: 'app-editor-item-group-description',
  templateUrl: './editor-item-group-description.component.html',
  styleUrls: ['./editor-item-group-description.component.scss', '../common/field-editor.scss']
})
export class EditorItemGroupDescriptionComponent implements OnDestroy {
  
  private static readonly invalidItemGroupDescriptionError = 'ITEM_MAIL_GROUP_INVALID_DESCRIPTION';

  itemGroupDescription : FormControl<string | null> = new FormControl<string>('', [Validators.maxLength(255)]);

  private readonly onDestroy = new Subject<void>();

  constructor(private editItemGroupService: EditItemGroupService) {
    this.itemGroupDescription.valueChanges.pipe(
      tap(value => this.updateDescription(value)),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private updateDescription(value: string | null) {
    const itemMailGroup = this.editItemGroupService.groupData.getValue()
    if (!itemMailGroup) { throw 'Item not defined'; }

    if (this.itemGroupDescription.valid) {
      this.editItemGroupService.removeError(EditorItemGroupDescriptionComponent.invalidItemGroupDescriptionError)
    } else {
      this.editItemGroupService.addError(EditorItemGroupDescriptionComponent.invalidItemGroupDescriptionError);
    }

    itemMailGroup.description = value === null ? '' : value;
    this.editItemGroupService.isUpdated.next(true)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
