import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItemSelectCollectionGet, MenuItemSelectGet } from '@common/api-client/models';
import { MenuItemSelectControllerService } from '@common/api-client/services';
import { Subject, takeUntil, tap } from 'rxjs';
import { EditorDialogService } from '../editors/editor-dialog.service';

@Component({
  selector: 'app-admin-menu-select-collection',
  templateUrl: './admin-menu-select-collection.component.html',
  styleUrls: ['../shared-css/menu-element-drag-drop-list.scss', './admin-menu-select-collection.component.scss']
})
export class AdminMenuSelectCollectionComponent implements OnDestroy {
  private readonly onDestroy = new Subject<void>();

  _selectCollection: MenuItemSelectCollectionGet | undefined;

  @Input() set select(value: MenuItemSelectCollectionGet) {
    this._selectCollection = JSON.parse(JSON.stringify(value));
  }

  constructor(
    private selectsService: MenuItemSelectControllerService,
    private editorService: EditorDialogService
  ) {
    this.editorService.onSelectDeleted.pipe(
      tap(deletedRef => {
        if (this._selectCollection) {
          this._selectCollection.menuItemSelects = this._selectCollection.menuItemSelects.filter(e => e.ref !== deletedRef)
        }
      }),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorService.onSelectUpdated.pipe(
      tap(select => this.onUpdateSelect(select)),
      takeUntil(this.onDestroy)
    ).subscribe()

    this.editorService.onSelectCreated.pipe(
      tap(select => this.onCreateSelect(select)),
      takeUntil(this.onDestroy)
    ).subscribe()
  }

  onUpdateSelect(newValue: MenuItemSelectGet) {
    if (!this._selectCollection) { throw 'Select collection not defined'; }

    for (const select of this._selectCollection.menuItemSelects) {
      if (select.ref === newValue.ref) {
        Object.assign(select, newValue);
      }
    }
  }

  onCreateSelect(newValue: MenuItemSelectGet) {
    if (!this._selectCollection) { throw 'Select collection not defined'; }

    if (this._selectCollection.ref === newValue.collectionRef) {
      this._selectCollection.menuItemSelects.push(newValue);
    }
  }


  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  moveUp(item: MenuItemSelectGet) {
  
  }

  moveDown(item: MenuItemSelectGet) {
    
  }
}
