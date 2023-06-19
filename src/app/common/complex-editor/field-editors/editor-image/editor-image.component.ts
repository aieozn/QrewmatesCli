import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { MultimediaControllerService } from '@common/api-client/services';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-editor-image',
  templateUrl: './editor-image.component.html',
  styleUrls: ['./editor-image.component.scss']
})
export class EditorImageComponent implements OnDestroy {
  imageUrl : string | undefined;
  private readonly onDestroy = new Subject<void>();

  _imageRef: FormControl<string | null> | undefined
  itemRefSub: Subscription | undefined

  @Input() set imageRef(value: FormControl<string | null>) {
    this._imageRef = value


    if (this.itemRefSub !== undefined) {
      this.itemRefSub.unsubscribe();
    }

    this.itemRefSub = value.valueChanges.pipe(
      tap(e => this.imageUrl = e ? this.accountService.getMultimediaUrl(e) : undefined),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  constructor(
    private multimediaService: MultimediaControllerService,
    private accountService: AccountService
  ) {
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
          this._imageRef?.setValue(uploadedImage.ref)
        });
      }
    }
  }

  remove() {
    this._imageRef?.setValue(null)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}