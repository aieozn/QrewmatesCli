import { EventEmitter, Injectable } from "@angular/core";
import { RestaurantTableGet } from "@common/api-client/models";
import { BehaviorSubject, Observable } from "rxjs";
import { ExtendedRestaurantTableData } from "./extended-restaurant-table-data";

@Injectable({
  providedIn: 'root'
})
export class EditTableService {
  onTableDeleted = new EventEmitter<string>();
  onTableUpdated = new EventEmitter<RestaurantTableGet>();
  onTableCreated = new EventEmitter<RestaurantTableGet>();
  onTableActivated = new EventEmitter<RestaurantTableGet>();
  onTableDeactivated = new EventEmitter<void>();

  private tableData: BehaviorSubject<ExtendedRestaurantTableData | undefined> = new BehaviorSubject<ExtendedRestaurantTableData | undefined>(undefined);

    public observeTableData(): Observable<ExtendedRestaurantTableData | undefined> {
        return this.tableData;
    }

    public getTableData(): ExtendedRestaurantTableData {
        const value = this.tableData.getValue();

        if (value === undefined) {
            throw 'Table data is not set';
        } else {
            return value;
        }
    }

    public update(data: ExtendedRestaurantTableData) {
        this.tableData.next(data);
    }

    public clear() {
        this.tableData.next({
            ref: undefined,
            name: '',
            posX: 0,
            posY: 0
        })
    }

    public clearWithValue(data: ExtendedRestaurantTableData) {
        this.tableData.next(data);
    }
}
  