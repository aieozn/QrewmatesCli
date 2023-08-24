import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MenuItemToppingExtendedData } from "./edit-topping-extended-data";

@Injectable({
    providedIn: 'root'
})
export class EditToppingService {
    private toppingData: BehaviorSubject<MenuItemToppingExtendedData | undefined> = new BehaviorSubject<MenuItemToppingExtendedData | undefined>(undefined);
    private isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    private isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    errors = new Set<string>()
    onSaveTry = new EventEmitter<void>();

    public addError(name: string) {
        this.errors.add(name);
        this.isValid.next(false)
    }

    public removeError(name: string) {
        this.errors.delete(name);
        this.isValid.next(this.errors.size === 0);
    }

    public clearErrors() {
        this.errors.clear();
        this.isValid.next(true);
    }

    public observeToppingData(): Observable<MenuItemToppingExtendedData | undefined> {
        return this.toppingData;
    }

    public getToppingData(): MenuItemToppingExtendedData {
        const value = this.toppingData.getValue();

        if (value === undefined) {
            throw 'Topping data is not set';
        } else {
            return value;
        }
    }

    public update(data: MenuItemToppingExtendedData) {
        this.isUpdated.next(true);
        this.toppingData.next(data);
    }

    public clearWithValue(data: MenuItemToppingExtendedData) {
        this.isUpdated.next(false);
        this.toppingData.next(data);
    }

    public clear(collectionRef: string) {
        this.toppingData.next({
            available: true,
            collectionRef: collectionRef,
            name: '',
            price: undefined
        });
    }

    public valid(): Observable<boolean> {
        return this.isValid;
    }

    public updated(): Observable<boolean> {
        return this.isUpdated;
    }
}