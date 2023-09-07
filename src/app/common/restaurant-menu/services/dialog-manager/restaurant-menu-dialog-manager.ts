import { OrderElementDataWrapper } from '@common/api-client/wrapper/order-element-data-wrapper';
import { Observable } from 'rxjs';
import { MenuItemGroupGet } from '@common/api-client/models';

export abstract class RestaurantMenuDialogManager {
  abstract openAddItem(group: MenuItemGroupGet) : Observable<OrderElementDataWrapper[] | undefined>;
  abstract openEditItem(group: MenuItemGroupGet, item: OrderElementDataWrapper) : Observable<OrderElementDataWrapper[] | undefined>;
}
