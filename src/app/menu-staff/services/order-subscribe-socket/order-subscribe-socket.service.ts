import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { map, Observable, retry } from 'rxjs';
import { orderSubscribeSocketServiceConfig } from './order-subscribe-socket-service.config';
import { SubscribeOrdersMessage } from 'src/app/openapi-cli/models/subscribe-orders-message';

@Injectable()
export class OrderSocketService implements OnDestroy {

  private rxStomp: RxStomp;
  private orderSub: {[key: string]: Observable<SubscribeOrdersMessage>} = {};

  // TODO provide only when required
  public constructor() {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(orderSubscribeSocketServiceConfig);
    this.rxStomp.activate();
  }
  
  ngOnDestroy(): void {
    this.rxStomp.deactivate();
  }

  public subscribeOrder(restaurantRef: string) : Observable<SubscribeOrdersMessage> {
    if (!this.orderSub[restaurantRef]) {
      this.orderSub[restaurantRef] = this.rxStomp.watch('/subscribe/' + restaurantRef + '/order')
      .pipe(map(e => JSON.parse(e.body).payload as SubscribeOrdersMessage));
    }

    return this.orderSub[restaurantRef];
  }
}
