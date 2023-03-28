import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { OrderGet } from '@common/api-client/models';
import { orderWaitSocketServiceConfig } from './order-wait-socket.config';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderWaitSocketService {

  private rxStomp: RxStomp;
  private orderSub: {[key: string]: Observable<OrderGet>} = {};
  private orderSubCount: {[key: string]: number} = {};
  private isActive = false;

  public constructor() {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(orderWaitSocketServiceConfig);
    
  }

  public wait(restaurantRef: string, orderRef: string) : Observable<OrderGet> {
    if (!this.isActive) {
      this.isActive = true;
      this.rxStomp.activate();
    }

    if (!this.orderSub[orderRef]) {
      this.orderSub[orderRef] = this.rxStomp.watch('/wait/' + restaurantRef + '/' + orderRef)
      .pipe(
        map(e => JSON.parse(e.body).payload as OrderGet)
      )

      this.orderSubCount[orderRef] = 0;
    }

    this.orderSubCount[orderRef] += 1;
    return this.orderSub[orderRef];
  }

  public unsubscribe(orderRef: string) {
    if (Object.prototype.hasOwnProperty.call(this.orderSub.hasOwnProperty, orderRef)) {
      delete this.orderSub[orderRef];
      this.orderSubCount[orderRef] -= 1;

      if (this.orderSubCount[orderRef] == 0) {
        delete this.orderSubCount[orderRef];
      }
    }

    if (Object.keys(this.orderSub).length === 0) {
      this.isActive = false;
      this.rxStomp.deactivate();
    }
  }
}
