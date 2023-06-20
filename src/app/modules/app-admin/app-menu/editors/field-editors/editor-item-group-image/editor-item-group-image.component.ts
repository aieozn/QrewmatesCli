import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MultimediaControllerService } from '@common/api-client/services';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { EditItemGroupService } from '../../edit-item-group/edit-item-group-service/edit-item-group-service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-item-group-image',
  templateUrl: './editor-item-group-image.component.html'
})
export class EditorItemGroupImageComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  imageRef : FormControl<string | null> = new FormControl<string>('');

  constructor(
    private multimediaService: MultimediaControllerService,
    private accountService: AccountService,
    private editGroupService: EditItemGroupService
  ) {

    this.editGroupService.observeGroupData().pipe(
      map(e => e?.image?.ref as string | undefined),
      tap(e => {
        this.imageRef.setValue(e ? e : null)
      }),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.imageRef.valueChanges.pipe(
      tap(e => this.update(e)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  update(imageRef: string | null) {
    const itemGroup = this.editGroupService.getGroupData()

    if (itemGroup.image?.ref != imageRef) {
      itemGroup.image = imageRef ? {
        ref: imageRef
      } : undefined;
  
      this.editGroupService.update(itemGroup);
    } 
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
