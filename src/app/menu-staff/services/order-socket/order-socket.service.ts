import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';
import { orderSocketServiceConfig } from './order-socket-service.config';
import { IMessage } from '@stomp/stompjs';

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

  public subscribeOrder(restaurantRef: string) : Observable<IMessage> {
    return this.rxStomp.watch('/subscribe/' + restaurantRef + '/order');
  }
}
