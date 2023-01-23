import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { delay, Observable, Subject, takeUntil } from 'rxjs';
import { OrderGet } from 'src/app/openapi-cli/models';
import { ConstValues } from '../../config/const-values';
import { OrderWaitSocketService } from '../../services/order-wait-socket/order-wait-socket.service';

@Component({
  selector: 'app-wait-for-order-dialog',
  templateUrl: './wait-for-order-dialog.component.html',
  styleUrls: ['./wait-for-order-dialog.component.scss']
})
export class WaitForOrderDialogComponent implements OnDestroy {

  public orderRef: string;
  public restaurantRef: string;
  public receivedOrder: Observable<OrderGet>;
  public successStatuses = ConstValues.SuccessStatuses;
  private readonly onDestroy = new Subject<void>();

  public constructor(
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
        delay(4 * 1000)
      );
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();

    this.orderWaitSocketService.unsubscribe(this.orderRef);
  }

  public return(orderGet: OrderGet) {
    this.dialogRef.close(orderGet);
  }
}
