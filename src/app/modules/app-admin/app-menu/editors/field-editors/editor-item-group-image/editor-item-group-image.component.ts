import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MultimediaControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, map, takeUntil, tap } from 'rxjs';
import { EditItemService } from '../../edit-item/edit-item-service/edit-item.service';
import { MenuItemGroupData } from '@common/api-client/models';

@Component({
  selector: 'app-editor-item-group-image',
  templateUrl: './editor-item-group-image.component.html',
  styleUrls: ['./editor-item-group-image.component.scss', '../common/field-editor.scss']
})
export class EditorItemGroupImageComponent implements OnDestroy {
  imageUrl : string | undefined;
  fullGroup: BehaviorSubject<MenuItemGroupData | undefined> = new BehaviorSubject<MenuItemGroupData | undefined>(undefined);
  private readonly onDestroy = new Subject<void>();

  constructor(
    private multimediaService: MultimediaControllerService,
    private accountService: AccountService,
    private editItemService: EditItemService
  ) {
    this.fullGroup = editItemService.activeGroup;

    this.fullGroup.pipe(
      map(e => e?.image?.ref as string | undefined),
      tap(e => this.imageUrl = e ? this.accountService.getMultimediaUrl(e) : undefined),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  upload(fileList: FileList | null) {
    if (fileList) {
      const file = fileList.item(0);

      let type : 'IMAGE_PNG' | 'IMAGE_JPEG';

      if (file?.type.includes('png')) {
        type = 'IMAGE_PNG';
      } else {
        type = 'IMAGE_JPEG';
      }

      if (file) {
        this.multimediaService.postMultimedia({
          type: type,
          restaurantRef: this.accountService.getRestaurantRef(),
          body: {
            file: file
          }
        }).subscribe(uploadedImage => {
          const itemGroup = this.fullGroup.getValue()
          if (!itemGroup) { throw 'Item group not defined'; }

          itemGroup.image = {
            ref: uploadedImage.ref
          }
          this.editItemService.activeGroup.next(itemGroup);
          this.editItemService.onUpdate.next();
        });
      }
    }
  }

  remove() {
    console.log("REMOVE")
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
