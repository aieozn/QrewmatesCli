import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderDetailsGet } from '@common/api-client/models';
import { Translators } from 'app/common/translators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  protected translator = Translators
  
  @Input()
  editable = true;

  @Input()
  order: OrderDetailsGet | undefined;

  @Output()
  onClose = new EventEmitter<void>();

  constructor(
    private router: Router,
    public accountService: AccountService
  ) {
  }

  editOrder(ref: string) {
    this.router.navigate(['/staff/edit/', ref]);
    this.onClose.emit();
  }
}
