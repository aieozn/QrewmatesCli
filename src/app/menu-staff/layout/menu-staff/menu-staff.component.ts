import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { OrderSocketService } from '../../services/order-socket/order-socket.service';

@Component({
  selector: 'app-menu-staff',
  templateUrl: './menu-staff.component.html',
  styleUrls: ['./menu-staff.component.scss'],
  providers: [ OrderSocketService ]
})
export class MenuStaffComponent implements OnInit, OnDestroy {

  // TODO change services names OrderInstanceControllerService -> OrderInstanceService (and the same for others)
  constructor(
    private orderSocket: OrderSocketService,
    private accountService: AccountService
  ) { }

  ngOnDestroy(): void {
    console.log("Destroy")
  }

  ngOnInit(): void {
    this.orderSocket.subscribeOrder(this.accountService.getRestaurantRef()).subscribe(e => {
      console.log("Message received");
      console.log(e.body);
    });
  }

}
