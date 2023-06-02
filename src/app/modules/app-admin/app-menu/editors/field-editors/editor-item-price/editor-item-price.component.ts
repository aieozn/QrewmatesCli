import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService } from '@common/account-utils/services/account.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-editor-item-price',
  templateUrl: './editor-item-price.component.html',
  styleUrls: ['./editor-item-price.component.scss', '../common/field-editor.scss']
})
export class EditorItemPriceComponent {
  @Input('price')
  elementNameFormControl : FormControl<string | null> | undefined;
  currency: string | undefined;

  constructor(private accountService: AccountService) {
    accountService.getRestaurant().pipe(
      tap(restaurant => this.currency = restaurant.currency)
    ).subscribe();
  }
}
