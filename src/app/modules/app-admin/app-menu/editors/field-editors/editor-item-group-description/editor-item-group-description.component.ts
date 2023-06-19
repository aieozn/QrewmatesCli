import { Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditItemGroupService } from '../../edit-item-group/edit-item-group-service/edit-item-group-service';
import { MenuItemGroupData } from '@common/api-client/models';

@Component({
  selector: 'app-editor-item-group-description',
  templateUrl: './editor-item-group-description.component.html'
})
export class EditorItemGroupDescriptionComponent implements OnDestroy {
  
  private static readonly invalidItemGroupDescriptionError = 'ITEM_MAIL_GROUP_INVALID_DESCRIPTION';

  itemGroupDescription : FormControl<string | null> = new FormControl<string>('', [Validators.maxLength(255)]);

  private readonly onDestroy = new Subject<void>();

  constructor(private editItemGroupService: EditItemGroupService) {

    this.editItemGroupService.observeGroupData().pipe(
      tap(e => this.loadDescription(e)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editItemGroupService.onSaveTry.pipe(
      tap(() => this.itemGroupDescription.markAllAsTouched()),
      takeUntil(this.onDestroy)
    ).subscribe();

    this.itemGroupDescription.valueChanges.pipe(
      tap(() => this.updateDescription()),
      takeUntil(this.onDestroy)
    ).subscribe();
  }

  private loadDescription(data: MenuItemGroupData | undefined) {
    this.itemGroupDescription.setValue(data?.description ? data.description : '')
    this.submitErrors();
  }

  private updateDescription() {
    const itemMailGroup = this.editItemGroupService.getGroupData()

    this.submitErrors();

    if (itemMailGroup.description != this.itemGroupDescription.value) {
      itemMailGroup.description = this.itemGroupDescription.value === null ? '' : this.itemGroupDescription.value;
      this.editItemGroupService.update(itemMailGroup);
    }
  }

  private submitErrors() {
    if (this.itemGroupDescription.valid) {
      this.editItemGroupService.removeError(EditorItemGroupDescriptionComponent.invalidItemGroupDescriptionError)
    } else {
      this.editItemGroupService.addError(EditorItemGroupDescriptionComponent.invalidItemGroupDescriptionError);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
