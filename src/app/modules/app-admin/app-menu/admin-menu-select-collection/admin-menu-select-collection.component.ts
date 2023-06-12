import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItemSelectCollectionGet, MenuItemSelectGet } from '@common/api-client/models';
import { MenuItemSelectControllerService } from '@common/api-client/services';
import { Subject } from 'rxjs';

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
    private selectsService: MenuItemSelectControllerService
  ) {
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
