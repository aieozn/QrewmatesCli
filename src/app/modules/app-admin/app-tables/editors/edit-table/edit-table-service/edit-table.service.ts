import { EventEmitter, Injectable } from "@angular/core";
import { RestaurantTableGet } from "@common/api-client/models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditTableService {
  onTableDeleted = new EventEmitter<string>();
  onTableUpdated = new EventEmitter<RestaurantTableGet>();
  onTableCreated = new EventEmitter<RestaurantTableGet>();

  private tableData: BehaviorSubject<RestaurantTableGet | undefined> = new BehaviorSubject<RestaurantTableGet | undefined>(undefined);

    public observeTableData(): Observable<RestaurantTableGet | undefined> {
        return this.tableData;
    }

    public getTableData(): RestaurantTableGet {
        const value = this.tableData.getValue();

        if (value === undefined) {
            throw 'Table data is not set';
        } else {
            return value;
        }
    }

    public update(data: RestaurantTableGet) {
        this.tableData.next(data);
    }

    public clearWithValue(data: RestaurantTableGet) {
        this.tableData.next(data);
    }
}
  