import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItemDetailedGet } from '@common/api-client/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {
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
