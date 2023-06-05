import { Component, OnDestroy } from '@angular/core';
import { AccountService } from '@common/account-utils/services/account.service';
import { MultimediaControllerService } from '@common/api-client/services';
import { BehaviorSubject, Subject, map, takeUntil, tap } from 'rxjs';
import { MenuItemGroupData } from '@common/api-client/models';
import { EditItemGroupService } from '../../edit-item-group/edit-item-group-service/edit-item-group-service';

@Component({
  selector: 'app-editor-item-group-image',
  templateUrl: './editor-item-group-image.component.html',
  styleUrls: ['./editor-item-group-image.component.scss', '../common/field-editor.scss']
})
export class EditorItemGroupImageComponent implements OnDestroy {
  imageUrl : string | undefined;
  groupData: BehaviorSubject<MenuItemGroupData | undefined> = new BehaviorSubject<MenuItemGroupData | undefined>(undefined);
  private readonly onDestroy = new Subject<void>();

  constructor(
    private multimediaService: MultimediaControllerService,
    private accountService: AccountService,
    private editGroupService: EditItemGroupService
  ) {
    this.groupData = editGroupService.groupData;

    this.groupData.pipe(
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
          const itemGroup = this.groupData.getValue()
          if (!itemGroup) { throw 'Item group not defined'; }

          itemGroup.image = {
            ref: uploadedImage.ref
          }
          this.editGroupService.groupData.next(itemGroup);
          this.editGroupService.isUpdated.next(true);
        });
      }
    }
  }

  remove() {
    const itemGroup = this.groupData.getValue()
    if (!itemGroup) { throw 'Item group not defined'; }

    itemGroup.image = undefined;
    this.imageUrl = undefined;
    this.editGroupService.groupData.next(itemGroup);
    this.editGroupService.isUpdated.next(true);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
