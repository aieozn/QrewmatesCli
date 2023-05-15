import { Component, Input, OnDestroy } from '@angular/core';
import { MenuItemDetailedGet } from '@common/api-client/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toppings',
  templateUrl: './toppings.component.html',
  styleUrls: ['./toppings.component.scss']
})
export class ToppingsComponent implements OnDestroy {
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
