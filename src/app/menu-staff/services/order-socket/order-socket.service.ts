import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { map, Observable } from 'rxjs';
import { orderSocketServiceConfig } from './order-socket-service.config';
import { SubscribeOrdersMessage } from 'src/app/openapi-cli/models/subscribe-orders-message';

@Injectable()
export class OrderSocketService implements OnDestroy {

  private rxStomp: RxStomp;

  // TODO provide only when
  public constructor() {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(orderSocketServiceConfig);
    this.rxStomp.activate();
  }
  
  ngOnDestroy(): void {
    this.rxStomp.deactivate();
  }

  public subscribeOrder(restaurantRef: string) : Observable<SubscribeOrdersMessage> {
    return this.rxStomp.watch('/subscribe/' + restaurantRef + '/order')
      .pipe(map(e => JSON.parse(e.body).payload as SubscribeOrdersMessage));
  }
}
