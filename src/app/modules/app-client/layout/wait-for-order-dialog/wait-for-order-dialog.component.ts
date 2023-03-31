import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderGet } from '@common/api-client/models';
import { delay, Observable, Subject, takeUntil } from 'rxjs';
import { ConstValues } from '../../config/const-values';
import { OrderWaitSocketService } from '../../services/order-wait-socket/order-wait-socket.service';

@Component({
  selector: 'app-wait-for-order-dialog',
  templateUrl: './wait-for-order-dialog.component.html',
  styleUrls: ['./wait-for-order-dialog.component.scss']
})
export class WaitForOrderDialogComponent implements OnDestroy {

  orderRef: string;
  restaurantRef: string;
  receivedOrder: Observable<OrderGet>;
  successStatuses = ConstValues.SuccessStatuses;
  private readonly onDestroy = new Subject<void>();

  constructor(
    private orderWaitSocketService: OrderWaitSocketService,
    public dialogRef: MatDialogRef<WaitForOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      orderRef: string,
      restaurantRef: string,
    }
  ) {
    this.orderRef = data.orderRef;
    this.restaurantRef = data.restaurantRef;

    this.receivedOrder = this.orderWaitSocketService
      .wait(this.restaurantRef, this.orderRef)
      .pipe(
        takeUntil(this.onDestroy),
        delay(500)
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();

    this.orderWaitSocketService.unsubscribe(this.orderRef);
  }

  return(orderGet: OrderGet) {
    this.dialogRef.close(orderGet);
  }
}
