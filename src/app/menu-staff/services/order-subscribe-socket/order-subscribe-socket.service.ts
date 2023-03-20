import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { map, Observable, retry } from 'rxjs';
import { orderSubscribeSocketServiceConfig } from './order-subscribe-socket-service.config';
import { SubscribeOrdersMessage } from 'src/app/openapi-cli/models/subscribe-orders-message';
import { AccountService } from 'src/app/shared/services/account/account.service';

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
    let activeUser = this.accountService.getActiveUser();

    if (!activeUser) {
      this.accountService.unauthorized();
      throw 'Login first';
    }

    let headers = {
      'Authorization': `Bearer ${activeUser.token}`
    }

    if (!this.orderSub[restaurantRef]) {
      this.orderSub[restaurantRef] = this.rxStomp.watch('/subscribe/' + restaurantRef + '/orders', headers)
      .pipe(map(e => JSON.parse(e.body).payload as SubscribeOrdersMessage));
    }

    return this.orderSub[restaurantRef];
  }
}
