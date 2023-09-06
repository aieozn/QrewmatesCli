import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@common/account-utils/services/account.service';
import { OrderDetailsGet } from '@common/api-client/models';
import { StatusLineType } from 'app/common/components/status-line/status-line/status-line-type';
import { UserAction, Translators } from 'app/common/translators';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  protected translator = Translators
  
  @Input()
  editable = false;

  @Input()
  order: OrderDetailsGet | undefined;

  @Output()
  onClose = new EventEmitter<void>();

  orderStatuses: StatusLineType[] = [
    {
      id: 'PLACED',
      name: Translators.translateOrderStatus('PLACED'),
      type: 'DEFAULT'
    },
    {
      id: 'EXPIRED',
      name: Translators.translateOrderStatus('EXPIRED'),
      type: 'ERROR'
    },
    {
      id: 'ABANDONED',
      name: Translators.translateOrderStatus('ABANDONED'),
      type: 'ERROR'
    },
    {
      id: 'REJECTED',
      name: Translators.translateOrderStatus('REJECTED'),
      type: 'ERROR'
    },
    {
      id: 'ACCEPTED',
      name: Translators.translateOrderStatus('ACCEPTED'),
      type: 'DEFAULT'
    },
    {
      id: 'CANCELED',
      name: Translators.translateOrderStatus('CANCELED'),
      type: 'ERROR'
    },
    {
      id: 'SERVED',
      name: Translators.translateOrderStatus('SERVED'),
      type: 'DEFAULT'
    }
  ]

  // 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN';
  paymentStatuses: StatusLineType[] = [
    {
      id: 'UNPAID',
      name: Translators.translatePaymentStatus('UNPAID'),
      type: 'DEFAULT'
    },
    {
      id: 'PAID',
      name: Translators.translatePaymentStatus('PAID'),
      type: 'DEFAULT'
    },
    {
      id: 'RETURNED',
      name: Translators.translatePaymentStatus('RETURNED'),
      type: 'ERROR'
    },
    {
      id: 'WITHDRAWN',
      name: Translators.translatePaymentStatus('WITHDRAWN'),
      type: 'DEFAULT'
    }
  ]

  constructor(
    private router: Router,
    public accountService: AccountService
  ) {
  }

  editOrder(ref: string) {
    this.router.navigate(['/staff/edit/', ref]);
    this.onClose.emit();
    return false;
  }

  @Output()
  onAction = new EventEmitter<UserAction>();

  doAction(action: UserAction) {
    this.onAction.emit(action);
  }
}
