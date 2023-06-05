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
    errors = new Set<string>()
    onSaveTry = new EventEmitter<void>();


    public addError(name: string) {
        this.errors.add(name);
        this.isValid.next(false)
    }

    public removeError(name: string) {
        this.errors.delete(name);
        this.isValid.next(this.errors.size == 0);
    }

    public clearErrors() {
        this.errors.clear()
        this.isValid.next(true);
    }

    public updateGroup(group: MenuItemGroupData) {
        if (this.groupData.getValue() !== undefined) {
            this.isUpdated.next(true);
        }
        
        this.groupData.next(group);
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