import { EventEmitter, Injectable } from "@angular/core";
import { MenuItemGroupData } from "@common/api-client/models";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class EditItemGroupService {
    groupData: BehaviorSubject<MenuItemGroupData | undefined> = new BehaviorSubject<MenuItemGroupData | undefined>(undefined);
    
    isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    errors: string[] = [];
    onSaveTry = new EventEmitter<void>();


    public addError(name: string) {
        this.errors.push(name);
        this.isValid.next(false)
    }

    public removeError(name: string) {
        this.errors = this.errors.filter(e => e !== name);
        this.isValid.next(this.errors.length == 0);
    }
    public clearErrors() {
        this.errors = [];
        this.isValid.next(true);
    }
}