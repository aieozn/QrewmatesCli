import { Injectable } from "@angular/core";
import { AllergenGet } from "@common/api-client/models";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EditAllergensService {
    private isUpdated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private allergens: BehaviorSubject<AllergenGet[]> = new BehaviorSubject<AllergenGet[]>([]);

    public addAllergen(data: AllergenGet) {
        const activeAllergens = this.allergens.getValue();
        activeAllergens.push(data)
        this.allergens.next(activeAllergens);

        this.isUpdated.next(true)
    }

    public clearWithValue(data: AllergenGet[]) {  
        this.isUpdated.next(false)      
        this.allergens.next(data);
    }

    public clear() {
        this.isUpdated.next(false)
        this.allergens.next([]);
    }

    public removeAllergen(data: AllergenGet) {
        let activeAllergens = this.allergens.getValue();
        activeAllergens = activeAllergens.filter(e => e.ref !== data.ref)
        this.allergens.next(activeAllergens);

        this.isUpdated.next(true)
    }

    public observeAllergensData(): Observable<AllergenGet[]> {
        return this.allergens;
    }
    
    public getAllergensData(): AllergenGet[] {
        return this.allergens.getValue();
    }

    public updated(): Observable<boolean> {
        return this.isUpdated;
    }
}