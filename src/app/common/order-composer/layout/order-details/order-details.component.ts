import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDetailsGet } from '@common/api-client/models';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  
  @Input()
  editable = true;

  @Input()
  order: OrderDetailsGet | undefined;

  @Output()
  onClose = new EventEmitter<void>();

  constructor(
    private router: Router
  ) {
  }

  translatePaymentMethod(method: 'CASH' | 'BLIK') {
    switch(method) {
      case 'CASH': return $localize`Cash`
      case 'BLIK': return $localize`Blik`
    }
  }

  translatePaymentStatus(method: 'UNPAID' | 'PAID' | 'RETURNED' | 'WITHDRAWN') {
    switch(method) {
      case 'UNPAID': return $localize`Not paid yet`
      case 'PAID': return $localize`Already paid`
      case 'RETURNED': return $localize`Order has been returned`
      case 'WITHDRAWN': return $localize`Order has been returned`
    }
  }

  translateOrderStatus(method: 'PLACED' | 'EXPIRED' | 'ABANDONED' | 'REJECTED' | 'ACCEPTED' | 'CANCELED' | 'SERVED') {
    switch(method) {
      case 'PLACED': return $localize`Placed`
      case 'EXPIRED': return $localize`Expired`
      case 'ABANDONED': return $localize`Abandoned`
      case 'REJECTED': return $localize`Rejected`
      case 'ACCEPTED': return $localize`Accepted`
      case 'CANCELED': return $localize`Canceled`
      case 'SERVED': return $localize`Served`
    }
  }

  editOrder(ref: string) {
    this.router.navigate(['/staff/edit/', ref]);
    this.onClose.emit();
  }
}
