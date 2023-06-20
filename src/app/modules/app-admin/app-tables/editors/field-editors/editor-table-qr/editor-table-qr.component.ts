import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EditTableService } from '../../edit-table/edit-table-service/edit-table.service';
import { Subject, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { QrCodeControllerService } from '@common/api-client/services';

@Component({
  selector: 'app-editor-table-qr',
  templateUrl: './editor-table-qr.component.html',
  styleUrls: ['./editor-table-qr.component.scss']
})
export class EditorTableQrComponent implements OnDestroy {

  @ViewChild('blobRef') blobRef!: ElementRef;
  private readonly onDestroy = new Subject<void>();

  constructor(
    protected editTableService: EditTableService,
    protected accountService: AccountService,
    private qrCodeService: QrCodeControllerService
  ) {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  openQrImage() {
    const table = this.editTableService.getTableData();
    const qrCode = table.qrCode;

    if (!qrCode) throw 'Qr code not defined';

    this.qrCodeService.getQrImage({
      restaurantRef: this.accountService.getRestaurantRef(),
      qrCodeRef: qrCode.ref
    }).pipe(
      tap(e => {
        const fileURL = window.URL.createObjectURL(e);
        const tab = window.open();
        tab!.location.href = fileURL;
      })
    ).subscribe()
  }

  downloadQrImage() {
    const table = this.editTableService.getTableData();
    const qrCode = table.qrCode;

    if (!qrCode) throw 'Qr code not defined';

    this.qrCodeService.getQrImage({
      restaurantRef: this.accountService.getRestaurantRef(),
      qrCodeRef: qrCode.ref
    }).pipe(
      tap(e => this.saveBlob(e, table.name))
    ).subscribe()
  }

  saveBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    this.blobRef.nativeElement.href = url;
    this.blobRef.nativeElement.download = fileName;
    this.blobRef.nativeElement.click();
    window.URL.revokeObjectURL(url);
  };
}
