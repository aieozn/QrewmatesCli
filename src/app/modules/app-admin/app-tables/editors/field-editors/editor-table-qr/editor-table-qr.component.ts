import { Component, OnDestroy } from '@angular/core';
import { EditTableService } from '../../edit-table/edit-table-service/edit-table.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editor-table-qr',
  templateUrl: './editor-table-qr.component.html',
  styleUrls: ['./editor-table-qr.component.scss']
})
export class EditorTableQrComponent implements OnDestroy {

  private readonly onDestroy = new Subject<void>();

  constructor(
    protected editTableService: EditTableService
  ) {
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
