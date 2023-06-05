import { EventEmitter, Injectable } from "@angular/core";
import { MenuItemGroupData } from "@common/api-client/models";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class EditItemGroupService {
    private groupData: BehaviorSubject<MenuItemGroupData | undefined> = new BehaviorSubject<MenuItemGroupData | undefined>(undefined);
    
    private isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
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

    public updateGroup(group: MenuItemGroupData) {
        this.groupData.next(group);
        this.isUpdated.next(true);
    }

    public observeGroupData(): Observable<MenuItemGroupData | undefined> {
        return this.groupData;
    }

    public getGroupData(): MenuItemGroupData {
        const groupData = this.groupData.getValue();

        if (groupData === undefined) {
            throw 'Group data not set';
        } else {
            return groupData;
        }
    }

    public valid(): Observable<boolean> {
        return this.isValid;
    }

    public updated(): Observable<boolean> {
        return this.isUpdated;
    }
}