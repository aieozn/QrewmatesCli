import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MenuItemSelectExtendedData } from "./edit-select-extended-data";

@Injectable({
    providedIn: 'root'
})
export class EditSelectService {
    private selectData: BehaviorSubject<MenuItemSelectExtendedData | undefined> = new BehaviorSubject<MenuItemSelectExtendedData | undefined>(undefined);
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

    public observeSelectData(): Observable<MenuItemSelectExtendedData | undefined> {
        return this.selectData;
    }

    public getSelectData(): MenuItemSelectExtendedData {
        const value = this.selectData.getValue();

        if (value === undefined) {
            throw 'Select data is not set';
        } else {
            return value;
        }
    }

    public update(data: MenuItemSelectExtendedData) {
        this.isUpdated.next(true);
        this.selectData.next(data);
    }

    public clearWithValue(data: MenuItemSelectExtendedData) {
        this.isUpdated.next(false);
        this.selectData.next(data);
    }

    public clear(collectionRef: string) {
        this.selectData.next({
            available: true,
            collectionRef: collectionRef,
            name: '',
            price: 0
        });
    }

    public valid(): Observable<boolean> {
        return this.isValid;
    }

    public updated(): Observable<boolean> {
        return this.isUpdated;
    }
}