import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { EditTableService } from '../../edit-table/edit-table-service/edit-table.service';
import { Subject, tap } from 'rxjs';
import { AccountService } from '@common/account-utils/services/account.service';
import { RestaurantTableControllerService } from '@common/api-client/services';

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
    private tablesService: RestaurantTableControllerService
  ) {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  openQrImagePdf() {
    const table = this.editTableService.getTableData();

    this.tablesService.getQrPdf({
      restaurantRef: this.accountService.getRestaurantRef(),
      tableRef: table!.ref!
    }).pipe(
      tap(e => this.openBlob(e))
    ).subscribe()
  }

  openQrImageJpg() {
    const table = this.editTableService.getTableData();

    this.tablesService.getQrImage({
      restaurantRef: this.accountService.getRestaurantRef(),
      tableRef: table!.ref!
    }).pipe(
      tap(e => this.openBlob(e))
    ).subscribe()
  }

  openQrImageRaw() {
    const table = this.editTableService.getTableData();

    this.tablesService.getQrSvg({
      restaurantRef: this.accountService.getRestaurantRef(),
      tableRef: table!.ref!
    }).pipe(
      tap(e => this.openBlob(e))
    ).subscribe()
  }

  openBlob(e: Blob) {
    const fileURL = window.URL.createObjectURL(e);
    const tab = window.open();
    tab!.location.href = fileURL;
  }

  saveBlob(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    this.blobRef.nativeElement.href = url;
    this.blobRef.nativeElement.download = fileName;
    this.blobRef.nativeElement.click();
    window.URL.revokeObjectURL(url);
  };
}
