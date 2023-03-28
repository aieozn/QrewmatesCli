import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { map, Observable } from 'rxjs';
import { orderSubscribeSocketServiceConfig } from './order-subscribe-socket-service.config';
import { SubscribeOrdersMessage } from '@common/api-client/models/subscribe-orders-message';
import { AccountService } from '@common/account-utils/services/account.service';

@Injectable()
export class OrderSocketService implements OnDestroy {

  private rxStomp: RxStomp;
  private orderSub: {[key: string]: Observable<SubscribeOrdersMessage>} = {};

  // TODO provide only when required
  public constructor(private accountService: AccountService) {
    this.rxStomp = new RxStomp();
    this.rxStomp.configure(orderSubscribeSocketServiceConfig);
    this.rxStomp.activate();
  }
  
  ngOnDestroy(): void {
    this.rxStomp.deactivate();
  }

  public subscribeOrder(restaurantRef: string) : Observable<SubscribeOrdersMessage> {
    const activeUser = this.accountService.getActiveUser();

    if (!activeUser) {
      this.accountService.unauthorized();
      throw 'Login first';
    }

    const headers = {
      'Authorization': `Bearer ${activeUser.token}`
    }

    if (!this.orderSub[restaurantRef]) {
      this.orderSub[restaurantRef] = this.rxStomp.watch('/subscribe/' + restaurantRef + '/orders', headers)
      .pipe(map(e => JSON.parse(e.body).payload as SubscribeOrdersMessage));
    }

    return this.orderSub[restaurantRef];
  }
}
