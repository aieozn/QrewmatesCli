import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItemDetailedGet } from '@common/api-client/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-item-settings',
  templateUrl: './edit-item-settings.component.html',
  styleUrls: ['./edit-item-settings.component.scss']
})
export class EditItemSettingsComponent implements OnDestroy {
  _item: MenuItemDetailedGet | undefined;

  private readonly onDestroy = new Subject<void>();

  @Input() set item(value: MenuItemDetailedGet) {
    this._item = value;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
