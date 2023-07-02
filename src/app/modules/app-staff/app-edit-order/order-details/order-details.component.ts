import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OrderDetailsGet } from '@common/api-client/models';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  order: OrderDetailsGet;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: {
      order: OrderDetailsGet
    },
    private router: Router,
    private dialogRef: MatDialogRef<OrderDetailsComponent>
  ) {
    this.order = data.order;
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
    this.dialogRef.close();
  }
}
